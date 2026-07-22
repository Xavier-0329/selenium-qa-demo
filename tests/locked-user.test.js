const assert = require("node:assert/strict");

const LoginPage = require("../pages/LoginPage");
const createDriver = require("../utils/driverFactory");
const captureScreenshot = require("../utils/screenshotHelper");

describe("Locked user login functionality", function () {
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
                    "locked-user"
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

    it("should display a locked-out error message", async function () {
        await loginPage.login(
            "locked_out_user",
            "secret_sauce"
        );

        const errorMessage =
            await loginPage.getErrorMessage();

        assert.equal(
            errorMessage,
            "Epic sadface: Sorry, this user has been locked out."
        );
    });
});