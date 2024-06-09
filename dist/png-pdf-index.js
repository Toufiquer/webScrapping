"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
|-----------------------------------------
| setting up Index for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: webScrapping, June, 2024
|-----------------------------------------
*/
const puppeteer_1 = require("puppeteer");
const readline = require("node:readline/promises");
const node_process_1 = require("node:process");
const { load } = require("@pspdfkit/nodejs");
const imgToPDF = require("image-to-pdf");
const fs = require("fs");
const folderName = "./save-pdf";
const rl = readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout });
const runApp = () => {
    (async () => {
        const url = await rl.question("Enter url\t");
        const count = await rl.question("Max number of files to save\t");
        const delayBetweenScreenshots = await rl.question("Delay between screenshots (in seconds)\t");
        const getAndSavePdf = async () => {
            try {
                if (!fs.existsSync(folderName)) {
                    fs.mkdirSync(folderName);
                }
            }
            catch (err) {
                console.error(err);
            }
            const browser = await puppeteer_1.default.launch({ headless: false, timeout: 60000 });
            const page = await browser.newPage();
            await page.setViewport({
                width: 1440,
                height: 960,
                deviceScaleFactor: 1,
                hasTouch: false,
                isMobile: false,
            });
            await page.goto(`${url}`, { waitUntil: "domcontentloaded" });
            // await page.
            for (let i = 0; i < parseInt(count); i++) {
                const fileName = `${new Date().toISOString()}`.replaceAll("-", "_").replaceAll(".", "_").replaceAll(":", "_");
                const imagePath = folderName + "/" + fileName + ".png";
                const pdfPath = folderName + "/" + fileName + ".pdf";
                try {
                    await page.screenshot({ path: imagePath, fullPage: true, captureBeyondViewport: true });
                }
                catch (err) {
                    console.error("Error saving image:", err);
                }
                // ! Convert to pdf
                const pages = [imagePath];
                try {
                    imgToPDF(pages, imgToPDF.sizes.A4).pipe(fs.createWriteStream(pdfPath));
                }
                catch (err) {
                    console.error("Error saving pdf :", err);
                }
                /* Delete the image after successful PDF creation */
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error("Error deleting image:", err);
                    }
                });
                // Add a delay to allow the website to change
                await new Promise((resolve) => setTimeout(resolve, parseInt(delayBetweenScreenshots) * 1000));
            }
            await browser.close();
        };
        getAndSavePdf();
        console.log("Success done the work");
        rl.close();
    })();
};
runApp();
