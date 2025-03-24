import { NextFunction, Request, Response } from 'express';
import { logger } from '../../utils/logger';
import puppeteer from 'puppeteer';
import { httpStatusCodes } from '../../utils/constants';
import models from '../../models';
import { Op } from 'sequelize';
import { videoExtensions } from '../../utils/stock_image_utils';

const groups = {
    // Img1
    group1: [
        'pkonline.blob.core.windows.net',
        'diamonds360.in',
        'videos.gem360.in',
        'workshop.360view.link',
        'v360.in',
        'd360.tech',
        'view.varnivideo.com',
        'sltrld.com',
        'v360.diamonds',
        'diamond.blissvideos.com',
        'video.S360.services',
        'v3603660.v360.in',
        'diamondvid.blob.core.windows.net',
        'video.diamonds360.in',
        'api1.v360.in',
        '360stonevideo.com',
        '360diamondvideo.com',
        'v360.diamondsvideo.com',
        'video.s360.services',
        'view-360.cloud:81',
        'dna.diamondvid.com',
        'v360n.s3.ap-southeast-1.wasabisys.com',
        'diamonddetail.s3.ap-south-1.amazonaws.com',
        'diamondurl.com',
        'diamview360.s3.ap-south-1.amazonaws.com',
        'vidb2c.s3.eu-north-1.amazonaws.com',
        'video.diamondasset.in',
        'diamlab.s3.eu-north-1.amazonaws.com',
        'lgdus.co',
        'clientmedia.s3.amazonaws.com',
        'v3603650.v360.in',
        'v3601487.v360.in',
        's3.ap-southeast-1.wasabisys.com',
        'diamondvideos360.s3.amazonaws.com',
        'visionpts.com',
        'view-360.video'
    ],

    // imagedata - 2 sec delay
    group2: [],

    // canvas - json format
    group3: ['view.gem360.in'],

    // canvas - json format
    group4: ['video360.in'],

    // video source without extension
    group5: ['nivoda-inhousemedia.s3.amazonaws.com'],

    // extract frame form .cwp-canvas canvas f1.jpg
    group6: ['widget.cutwise.com'],

    // i.jpg
    group7: ['dilog.cutwise.com'],

    // VIDEO/images/1.jpg
    group8: ['ds-360.jaykar.co.in']
};

class Stock {
    /// load images
    async fetchGroup1ImageData(url: string) {
        const browser = await puppeteer.launch({ headless: false }); // Use headless: false to debug visually
        try {
            logger.info('Script function start for group1');
            const page = await browser.newPage();

            logger.info('Navigating to URL...');
            await page.goto(url, {
                waitUntil: 'networkidle2' // Ensures all network requests are finished
            });

            logger.info('Waiting for image to load...');
            await page.waitForSelector('#Img1'); // Waits until an <img> tag appears

            logger.info('Extracting image...');
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

            logger.info('Navigating to URL...');
            await page.goto(url, {
                waitUntil: 'networkidle2' // Ensures all network requests are finished
            });

            logger.info('Waiting for image to load...');
            await page.waitForSelector('#imagedata'); // Waits until an <img> tag appears
            // wait for 2 seconds using promise
            await new Promise((resolve) => setTimeout(resolve, 2000));
            logger.info('Extracting image...');

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
            const resonse = await fetch(
                `https://d3akv4l29hxiqq.cloudfront.net/video360_live/diamonds/${id}/scan_files/1.json`
            );
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
    async captureVideoThumbnail(videoUrl: string) {
        logger.info('Starting Puppeteer for first frame capture...');

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        try {
            // Navigate to the video URL
            await page.goto(videoUrl);

            // Wait for the video element to be present
            await page.waitForSelector('video');

            // Select the video element
            // const video = await page.$('video');

            // Ensure the video is available in the DOM
            const base64Image: any = await page.evaluate(() => {
                return new Promise((resolve) => {
                    try {
                        const video = document.querySelector('video');
                        if (!video) {
                            logger.error('No <video> element found on the page!');
                            return resolve(null);
                        }

                        video.crossOrigin = 'anonymous'; // Ensure it's cross-origin compatible
                        video.currentTime = 1; // Seek to 1 second

                        video.addEventListener(
                            'seeked',
                            () => {
                                try {
                                    const canvas = document.createElement('canvas');
                                    const ctx = canvas.getContext('2d');

                                    if (!ctx) {
                                        logger.error('Failed to get canvas context');
                                        return resolve(null);
                                    }

                                    canvas.width = video.videoWidth;
                                    canvas.height = video.videoHeight;
                                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                                    resolve(canvas.toDataURL('image/jpeg')); // Get Base64 image
                                } catch (err) {
                                    logger.error('Error drawing video frame:', err);
                                    resolve(null);
                                }
                            },
                            { once: true }
                        );

                        video.addEventListener(
                            'error',
                            () => {
                                logger.error('Error loading video!');
                                resolve(null);
                            },
                            { once: true }
                        );
                    } catch (err) {
                        logger.error('Error processing video:', err);
                        resolve(null);
                    }
                });
            });

            logger.info(`Thumbnail generated for ${videoUrl}`);
            return base64Image;
        } catch (error) {
            logger.error('Error generating thumbnail:', error);
            return null;
        } finally {
            await browser.close();
        }
    }

    async fetchGroup6ImageData(url: string) {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
        }); // Use headless: false to debug visually
        try {
            logger.info('Script function start for group6');
            const page = await browser.newPage();

            let imageUrl: any;

            // Listen for all network requests
            page.on('request', (request) => {
                if (request.url().includes('.jpg')) {
                    const urlData = request.url().split('/');

                    urlData.pop();

                    urlData.push('f4.jpg');
                    imageUrl = urlData.join('/');
                }
            });

            logger.info('Navigating to URL...');
            await page.goto(url, {
                waitUntil: 'networkidle2' // Ensures all network requests are finished
            });

            // Wait until the modified URL is set
            while (!imageUrl) {
                await new Promise((resolve) => setTimeout(resolve, 500));
            }

            ///
            return imageUrl;
        } catch (error: any) {
            logger.error(error);
            return null;
        } finally {
            await browser.close();
        }
    }

    async fetchGroup7ImageData(url: string) {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
        }); // Use headless: false to debug visually
        try {
            logger.info('Script function start for group6');
            const page = await browser.newPage();

            let imageUrl: any;

            // Listen for all network requests
            page.on('request', (request) => {
                logger.info('Request URL:', request.url());
                if (request.url().includes('i.jpg')) {
                    imageUrl = request.url();
                }
            });

            logger.info('Navigating to URL...');
            await page.goto(url, {
                waitUntil: 'networkidle2' // Ensures all network requests are finished
            });

            // Wait until the modified URL is set
            while (!imageUrl) {
                await new Promise((resolve) => setTimeout(resolve, 500));
            }

            ///
            return imageUrl;
        } catch (error: any) {
            logger.error(error);
            return null;
        } finally {
            await browser.close();
        }
    }

    async fetchGroup8ImageData(url: string) {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
        }); // Use headless: false to debug visually
        try {
            logger.info('Script function start for group6');
            const page = await browser.newPage();

            let imageUrl: any;

            // Listen for all network requests
            page.on('request', (request) => {
                logger.info('Request URL:', request.url());
                if (request.url().includes('VIDEO/images/1.jpg')) {
                    imageUrl = request.url();
                }
            });

            logger.info('Navigating to URL...');
            await page.goto(url, {
                waitUntil: 'networkidle2' // Ensures all network requests are finished
            });

            // Wait until the modified URL is set
            while (!imageUrl) {
                await new Promise((resolve) => setTimeout(resolve, 500));
            }

            ///
            return imageUrl;
        } catch (error: any) {
            logger.error(error);
            return null;
        } finally {
            await browser.close();
        }
    }

    async getImageUrl(url: string) {
        try {
            logger.info('Script function start');
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
            logger.info('Group:', group);
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

            if (group === 'group6') {
                imageUrl = await this.fetchGroup6ImageData(url);
            }

            if (group === 'group7') {
                imageUrl = await this.fetchGroup7ImageData(url);
            }

            if (group === 'group8') {
                imageUrl = await this.fetchGroup8ImageData(url);
            }

            logger.info('Image URL FETCH RESULT:', imageUrl);

            return imageUrl;
        } catch (error: any) {
            logger.error(error);
            return null;
        }
    }

    /// get list of diamonds with no images
    async getDiamonds() {
        logger.info('Getting diamonds with no images...');
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
                                { diamond_video: { [Op.ne]: '' } }
                            ]
                        },
                        {
                            [Op.or]: [
                                { image_data: { [Op.eq]: null } },
                                { image_data: { [Op.eq]: 'null' } },
                                { image_data: { [Op.eq]: '' } }
                            ]
                        }
                    ]
                },
                attributes: ['id', 'stock_id', 'diamond_video', 'diamond_image', 'image_data'],
                raw: true
            });

            logger.info('Stocks length:', stocks.length);

            for (const stockItem of stocks) {
                logger.info('Stock Item:', stockItem);

                let imageUrl: string | null = null;

                /// check if diamond_video is video url using videoExtensions
                const isVideoUrl: boolean = stockItem?.diamond_video
                    ? videoExtensions.some((extension) => stockItem.diamond_video.includes(extension))
                    : false;

                if (isVideoUrl) {
                    logger.info('Video URL skipped:', stockItem.diamond_video);
                    imageUrl = await this.captureVideoThumbnail(stockItem?.diamond_video);
                } else {
                    imageUrl = await this.getImageUrl(stockItem?.diamond_video);
                    logger.info('Image URL:', imageUrl);
                }

                if (!imageUrl) {
                    logger.info('Image URL is null');
                    continue;
                }

                /// check if imageUrl is base64
                const isBase64: boolean = imageUrl ? imageUrl.startsWith('data:image') : false;

                logger.info('Is Base64:', isBase64);

                /// update image into stocks table
                await models.stocks.update(
                    {
                        image_data: isBase64 ? imageUrl : null,
                        diamond_image: isBase64 ? null : imageUrl
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
