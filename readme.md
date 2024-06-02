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

**Build & Run:**

1. Build the project: `npm run build`
2. Run the script: `npm run start`

**Usage:**

1. After running the script, you will be prompted to enter the following:
   - **URL:** The website you want to capture.
   - **Max number of files to save:** The maximum number of PDFs to generate.

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

**Additional Information:**

- The project uses TypeScript for better code organization and type safety.
- The `prettier` dependency is used for code formatting.

This readme provides a comprehensive overview of your project, addressing the code structure, usage, and contribution guidelines. You can further enhance it by adding more specific details about the implementation, potential use cases, and limitations.
