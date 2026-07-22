const fs = require("node:fs");
const path = require("node:path");

/**
 * Captures a browser screenshot and stores it in the screenshots folder.
 *
 * @param {import("selenium-webdriver").WebDriver} driver
 * @param {string} testName
 * @returns {Promise<string>}
 */
async function captureScreenshot(driver, testName) {
    const screenshotDirectory = path.join(
        process.cwd(),
        "screenshots"
    );

    fs.mkdirSync(screenshotDirectory, {
        recursive: true
    });

    const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-");

    const fileName = `${testName}-${timestamp}.png`;
    const filePath = path.join(
        screenshotDirectory,
        fileName
    );

    const screenshot = await driver.takeScreenshot();

    fs.writeFileSync(
        filePath,
        screenshot,
        "base64"
    );

    console.log(`Screenshot saved: ${filePath}`);

    return filePath;
}

module.exports = captureScreenshot;