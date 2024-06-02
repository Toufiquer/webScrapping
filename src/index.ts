/*
|-----------------------------------------
| setting up Index for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: webScrapping, June, 2024
|-----------------------------------------
*/
import puppeteer from "puppeteer";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
const { load } = require("@pspdfkit/nodejs");
const imgToPDF = require("image-to-pdf");

const fs = require("fs");

const folderName = "./save-pdf";

const rl = readline.createInterface({ input, output });
(async () => {
  const url = await rl.question("Enter url\t");
  console.log("url log: ", url);

  try {
    console.log(" try to create folder");
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
      console.log(" try to create folder 2");
    }
  } catch (err) {
    console.error(err);
  }
  const browser = await puppeteer.launch({ headless: false, timeout: 60000 });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1440,
    height: 960,
    deviceScaleFactor: 1,
    hasTouch: false,
    isMobile: false,
  });
  await page.goto(`${url}`);

  const fileName = `${new Date().toISOString()}`.replaceAll("-", "_").replaceAll(".", "_").replaceAll(":", "_");
  const imagePath = folderName + "/" + fileName;
  console.log(" imagePath : ", imagePath);
  await page.screenshot({ path: imagePath + ".png", fullPage: true });

  // ! Start to convert to pdf
  const pages = [
    imagePath + ".png", // path to the image
    fs.readFileSync(imagePath + ".png"), // Buffer
  ];

  imgToPDF(pages, imgToPDF.sizes.A4).pipe(fs.createWriteStream(imagePath + ".pdf"));

  await browser.close();

  rl.close();
})();
