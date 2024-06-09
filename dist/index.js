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
const fs = require("fs");
const folderName = "./save-pdf";
const rl = readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout });
const runApp = () => {
    (async () => {
        const url = await rl.question("Enter url\t");
        const count = await rl.question("Max number of files to save\t");
        const delayBetweenScreenshots = await rl.question("Delay between screenshots (in seconds)\t");
        const generatePdf = async (url, outputFile) => {
            // Browser actions & buffer creator
            const browser = await puppeteer_1.default.launch({
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
            });
            const page = await browser.newPage();
            await page.goto(url);
            await page.setViewport({
                width: 1440,
                height: 960,
                deviceScaleFactor: 1,
                hasTouch: false,
                isMobile: false,
            });
            const pdf = await page.pdf({ path: outputFile, format: "A4" });
            await browser.close();
            // Return Buffer
            return pdf;
        };
        const getAndSavePdf = async () => {
            // Create folder
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
            await page.setViewport({ width: 1600, height: 960 });
            await page.goto(`${url}`, { waitUntil: "domcontentloaded" });
            // await page.
            for (let i = 0; i < parseInt(count); i++) {
                const fileName = `${new Date().toISOString()}`.replaceAll("-", "_").replaceAll(".", "_").replaceAll(":", "_");
                const pdfPath = folderName + "/" + fileName + ".pdf";
                generatePdf(url, pdfPath);
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
