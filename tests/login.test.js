const { until } = require("selenium-webdriver");
const assert = require("node:assert/strict");

const LoginPage = require("../pages/LoginPage");
const createDriver = require("../utils/driverFactory");
const captureScreenshot = require("../utils/screenshotHelper");

describe("Login functionality", function () {
    this.timeout(15000);

    let driver;
    let loginPage;

    beforeEach(async function () {
        driver = await createDriver();
        loginPage = new LoginPage(driver);
        await loginPage.open();
    });

    afterEach(async function () {
        if (this.currentTest.state === "failed" && driver) {
            try {
                await captureScreenshot(
                    driver,
                    "valid-login"
                );
            } catch (screenshotError) {
                console.error(
                    "Unable to capture failure screenshot:",
                    screenshotError
                );
            }
        }

        if (driver) {
            await driver.quit();
        }
    });

    it("should allow a valid user to access the inventory page", async function () {
        await loginPage.login(
            "standard_user",
            "secret_sauce"
        );

        await driver.wait(
            until.urlContains("inventory"),
            5000
        );

        const currentUrl =
            await driver.getCurrentUrl();

        assert.ok(
            currentUrl.includes("inventory"),
            `Expected inventory page, but received: ${currentUrl}`
        );
    });
});