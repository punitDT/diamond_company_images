import { NextFunction, Request, Response } from 'express';
import { logger } from '../../utils/logger';
import puppeteer from 'puppeteer';
import { httpStatusCodes } from '../../utils/constants';
import models from '../../models';
import { Op } from 'sequelize';

const groups = {
    // Img1
    group1: ['pkonline.blob.core.windows.net', 'diamonds360.in', 'videos.gem360.in', 'workshop.360view.link'],

    // imagedata - 2 sec delay
    group2: ['ds-360.jaykar.co.in'],

    // canvas - json format
    group3: ['view.gem360.in']
};

class Stock {
    /// load images
    async fetchGroup1ImageData(url: string) {
        const browser = await puppeteer.launch({ headless: false }); // Use headless: false to debug visually
        try {
            logger.info('Script function start for group1');
            const page = await browser.newPage();

            console.log('Navigating to URL...');
            await page.goto(url, {
                waitUntil: 'networkidle2' // Ensures all network requests are finished
            });

            console.log('Waiting for image to load...');
            await page.waitForSelector('#Img1'); // Waits until an <img> tag appears

            console.log('Extracting image...');
            const base64Data = await page.evaluate(() => {
                const img = document.querySelector('#Img1') as HTMLImageElement;
                return img ? img.src : null;
            });

            if (!base64Data || !base64Data.startsWith('data:image')) {
                throw new Error('No valid base64 image found.');
            }

            return base64Data;
        } catch (error: any) {
            logger.error(error);
            return null;
        } finally {
            await browser.close();
        }
    }

    async fetchGroup2ImageData(url: string) {
        const browser = await puppeteer.launch({ headless: false }); // Use headless: false to debug visually
        try {
            logger.info('Script function start for group2');
            const page = await browser.newPage();

            console.log('Navigating to URL...');
            await page.goto(url, {
                waitUntil: 'networkidle2' // Ensures all network requests are finished
            });

            console.log('Waiting for image to load...');
            await page.waitForSelector('#imagedata'); // Waits until an <img> tag appears
            // wait for 2 seconds using promise
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log('Extracting image...');

            const base64Data = await page.evaluate(() => {
                const img = document.querySelector('#imagedata') as HTMLImageElement;
                return img ? img.src : null;
            });

            return base64Data;
        } catch (error: any) {
            logger.error(error);
            return null;
        } finally {
            // await browser.close();
        }
    }

    async fetchGroup3ImageData(url: string) {
        try {
            logger.info('Script function start for group2');
            const id = url.split('?d=')[1];
            const resonse = await fetch(`https://videos.gem360.in/imaged/${id}/1.json`);
            const data = await resonse.json();
            if (!data?.[0]) {
                return null;
            }

            return `data:image/jpeg;charset=utf-8;base64,${data[0]}`;
        } catch (error: any) {
            logger.error(error);
            return null;
        }
    }

    async getImageUrl(url: string) {
        try {
            logger.info('Script function start');
            // const urlString = url;
            // const urlString = 'https://ds-360.jaykar.co.in/ds_360.php?chk=QWxs&q=Njc3NTA1OTM2';
            // const urlString = 'https://diamonds360.in/admin/upload/webdiamonds/MD228-6A/MD228-6A.html';
            const urlString = 'https://view.gem360.in/gem360.html?d=0509241206-KVD-44';
            // check domain group
            let group: string | undefined;
            for (const key in groups) {
                if (
                    groups[key].some((value) => {
                        return urlString.includes(value);
                    })
                ) {
                    group = key;
                    break;
                }
            }
            console.log('Group:', group);
            let imageUrl: string | null = null;
            if (group === 'group1') {
                imageUrl = await this.fetchGroup1ImageData(urlString);
            }

            if (group === 'group2') {
                imageUrl = await this.fetchGroup2ImageData(urlString);
            }

            if (group === 'group3') {
                imageUrl = await this.fetchGroup3ImageData(urlString);
            }

            console.log('Image URL FETCH RESULT:', imageUrl);

            return imageUrl;
        } catch (error: any) {
            logger.error(error);
        }
    }

    /// get list of diamonds with no images
    async getDiamonds() {
        try {
            const stocks = await models.stocks.findAll({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                { diamond_image: { [Op.eq]: null } },
                                { diamond_image: 'null' },
                                { diamond_image: '' }
                            ]
                        },
                        {
                            [Op.and]: [
                                { diamond_video: { [Op.ne]: null } },
                                { diamond_video: { [Op.ne]: 'null' } },
                                { diamond_video: { [Op.ne]: '' } }
                            ]
                        }
                    ]
                },
                attributes: ['id', 'stock_id', 'diamond_video', 'diamond_image'],
                raw: true
            });

            // console.log('Stocks:', stocks);

            for (const stockItem of stocks) {
                console.log('Stock Item:', stockItem);
            }

            const htmlUrlLists: any = stocks.map((stock: any) => stock?.diamond_video?.split('//')[1].split('/')[0]); // Get the domain name from the video URL
            const uniqueHtmlUrlLists = Array.from(new Set(htmlUrlLists)); // Remove duplicates
            console.log('Unique HTML URL Lists:', uniqueHtmlUrlLists);

            const urlList: any = stocks.map((stock: any) => stock?.diamond_video);

            for (const key in groups) {
                /// base url lists
                const baseUrlLists = groups[key];

                /// prints first url contain base url lists
                const baseUrl = urlList.find((url: any) => baseUrlLists.some((baseUrl: any) => url.includes(baseUrl)));

                console.log('View Gem360 In:', baseUrl);
            }

            // return htmlUrlLists;

            // Get list of diamonds with no images
        } catch (error: any) {
            logger.error(error);
        }
    }
}

export default new Stock();
