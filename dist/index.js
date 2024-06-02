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
const rl = readline.createInterface({ input: node_process_1.stdin, output: node_process_1.stdout });
(async () => {
    const url = await rl.question("Enter url\t");
    console.log("url log: ", url);
    const browser = await puppeteer_1.default.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1440,
        height: 960,
        deviceScaleFactor: 1,
        hasTouch: false,
        isMobile: false,
    });
    await page.goto(`${url}`);
    await browser.close();
    rl.close();
})();
