import { NextFunction, Request, Response } from 'express';
import { logger } from '../../utils/logger';
import puppeteer from 'puppeteer';
import { httpStatusCodes } from '../../utils/constants';
import models from '../../models';
import { Op } from 'sequelize';
import { videoExtensions } from '../../utils/stock_image_utils';

const groups = {
    // Img1
    group1: ['pkonline.blob.core.windows.net', 'diamonds360.in', 'videos.gem360.in', 'workshop.360view.link', 'v360.in', 'd360.tech', 'view.varnivideo.com',
        'sltrld.com', 'v360.diamonds', 'diamond.blissvideos.com', 'video.S360.services', 'v3603660.v360.in', 'diamondvid.blob.core.windows.net', 'video.diamonds360.in',
        'api1.v360.in', '360stonevideo.com', '360diamondvideo.com', 'v360.diamondsvideo.com', 'video.s360.services', 'view-360.cloud:81', 'dna.diamondvid.com',
        'v360n.s3.ap-southeast-1.wasabisys.com', 'diamonddetail.s3.ap-south-1.amazonaws.com', 'diamondurl.com', 'diamview360.s3.ap-south-1.amazonaws.com',
        'vidb2c.s3.eu-north-1.amazonaws.com', 'video.diamondasset.in', 'diamlab.s3.eu-north-1.amazonaws.com', 'lgdus.co', 'clientmedia.s3.amazonaws.com',
        'v3603650.v360.in', 'v3601487.v360.in', 's3.ap-southeast-1.wasabisys.com', 'diamondvideos360.s3.amazonaws.com', 'visionpts.com'],

    // imagedata - 2 sec delay
    group2: ['ds-360.jaykar.co.in'],

    // canvas - json format
    group3: ['view.gem360.in'],

    // canvas - json format
    group4: ['video360.in'],

    // video source without extension
    group5: ['nivoda-inhousemedia.s3.amazonaws.com'],
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
            await browser.close();
        }
    }

    async fetchGroup3ImageData(url: string) {
        try {
            logger.info('Script function start for group3');
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

    async fetchGroup4ImageData(url: string) {
        try {
            logger.info('Script function start for group4');
            const id = url.split('/').pop();
            const resonse = await fetch(`https://d3akv4l29hxiqq.cloudfront.net/video360_live/diamonds/${id}/scan_files/1.json`);
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

    /// get video thumbnail from video url
    async captureVideoThumbnail(videoUrl: string, screenshotTime = 1) {
        console.log('Starting Puppeteer for first frame capture...');

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        try {

            // Navigate to the video URL
            await page.goto(videoUrl);

            // Wait for the video element to be present
            await page.waitForSelector('video');

            // Select the video element
            const video = await page.$('video');

            // Play the video and wait for the specified time
            if (video) {
                await page.evaluate(async (videoElement, time) => {
                    // wait for 2 seconds using promise
                    await new Promise((resolve) => setTimeout(resolve, 15000));
                    videoElement.currentTime = time;
                    return new Promise<void>((resolve) => {
                        videoElement.onseeked = () => resolve();
                    });
                }, video, screenshotTime);
            } else {
                throw new Error('Video element not found');
            }



            // Take a screenshot of the video
            const screenshot = await video?.screenshot({ encoding: 'base64' });

            console.log(`Thumbnail generated for ${videoUrl}`);
            return `data:image/jpeg;charset=utf-8;base64,${screenshot}`;
        } catch (error) {
            console.error('Error generating thumbnail:', error);
            throw error;
        } finally {
            await browser.close();
        }
    }

    async getImageUrl(url: string) {
        try {
            logger.info('Script function start');
            // const urlString = url;
            // const urlString = 'https://ds-360.jaykar.co.in/ds_360.php?chk=QWxs&q=Njc3NTA1OTM2';
            // const urlString = 'https://diamonds360.in/admin/upload/webdiamonds/MD228-6A/MD228-6A.html';
            // const urlString = 'https://view.gem360.in/gem360.html?d=0509241206-KVD-44';
            // check domain group
            let group: string | undefined;
            for (const key in groups) {
                if (
                    groups[key].some((value) => {
                        return url.includes(value);
                    })
                ) {
                    group = key;
                    break;
                }
            }
            console.log('Group:', group);
            let imageUrl: string | null = null;
            if (group === 'group1') {
                imageUrl = await this.fetchGroup1ImageData(url);
            }

            if (group === 'group2') {
                imageUrl = await this.fetchGroup2ImageData(url);
            }

            if (group === 'group3') {
                imageUrl = await this.fetchGroup3ImageData(url);
            }

            if (group === 'group4') {
                imageUrl = await this.fetchGroup4ImageData(url);
            }

            if (group === 'group5') {
                imageUrl = await this.captureVideoThumbnail(url);
            }

            console.log('Image URL FETCH RESULT:', imageUrl);

            return imageUrl;
        } catch (error: any) {
            logger.error(error);
            return null;
        }
    }

    /// get list of diamonds with no images
    async getDiamonds() {
        try {
            const stocks = await models.stocks.findAll({
                // where: {
                //     id: '8e5044e1-b818-46ff-8a9f-61b27ccbaf38'
                // },
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                { diamond_image: { [Op.eq]: null } },
                                { diamond_image: { [Op.eq]: 'null' } },
                                { diamond_image: { [Op.eq]: '' } }
                            ]
                        },
                        {
                            [Op.and]: [
                                { diamond_video: { [Op.ne]: null } },
                                { diamond_video: { [Op.ne]: 'null' } },
                                { diamond_video: { [Op.ne]: '' } },
                            ]
                        },
                        {
                            [Op.and]: [
                                { image_data: { [Op.eq]: null } },
                                { image_data: { [Op.eq]: 'null' } },
                                { image_data: { [Op.eq]: '' } }
                            ]
                        },
                    ]
                },
                attributes: ['id', 'stock_id', 'diamond_video', 'diamond_image'],
                raw: true
            });

            console.log('Stocks length:', stocks.length);

            for (const stockItem of stocks) {
                console.log('Stock Item:', stockItem);

                let imageUrl: string | null = null;

                /// check if diamond_video is video url using videoExtensions
                const isVideoUrl: boolean = stockItem?.diamond_video
                    ? videoExtensions.some((extension) => stockItem.diamond_video.includes(extension))
                    : false;

                if (isVideoUrl) {
                    console.log('Video URL skipped:', stockItem.diamond_video);
                    imageUrl = await this.captureVideoThumbnail(stockItem?.diamond_video);
                } else {
                    imageUrl = await this.getImageUrl(stockItem?.diamond_video);
                    console.log('Image URL:', imageUrl);
                }

                if (imageUrl === null) {
                    console.log('Image URL is null');
                    continue;
                }


                /// check if imageUrl is base64
                const isBase64: boolean = imageUrl ? imageUrl.startsWith('data:image') : false;

                console.log('Is Base64:', isBase64);

                /// update image into stocks table
                await models.stocks.update(
                    {
                        image_data: isBase64 ? imageUrl : null,
                        diamond_image: isBase64 ? null : imageUrl,
                    },
                    {
                        where: {
                            id: stockItem.id
                        }
                    }
                );

            }

            // Get list of diamonds with no images
        } catch (error: any) {
            logger.error(error);
        }
    }
}

export default new Stock();
