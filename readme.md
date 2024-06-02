## Web Scrapping: PDF Generator

This project uses puppeteer to capture web pages and convert them to PDF documents.

**Features:**

- Captures full-page screenshots of a given URL.
- Converts screenshots to A4 PDF files.
- Takes input from the user for the URL and the maximum number of files to save.
- Schedules PDF generation with a set interval (currently 10 minutes).

**Dependencies:**

- `@pspdfkit/nodejs`: For loading PDF files.
- `image-to-pdf`: For converting images to PDF.
- `puppeteer`: For browser automation.

**Installation:**

```bash
npm install
```

```bash
yarn add
```

**Usage:**

1. Run the script: `node index.js`
2. Enter the URL you want to capture.
3. Enter the maximum number of files to save.

**Note:**

- The script will create a directory named "save-pdf" in the same directory as the script.
- The PDF files will be saved in the "save-pdf" directory with filenames based on the current date and time.
- The script runs indefinitely, capturing and saving PDFs at the specified interval.

**Configuration:**

- You can modify the `minute` variable in the `runApp()` function to change the interval between captures.
- You can also modify the `folderName` variable to change the directory where the PDFs are saved.

**Example:**

```
Enter url: https://www.example.com
Max number of files to save: 5
```

The script will capture the webpage at `https://www.example.com` and save 5 PDF files in the "save-pdf" directory, with each file being saved every 10 minutes.

**Contributing:**

Contributions are welcome! Please open an issue or submit a pull request.

**License:**

This project is licensed under the MIT License.
