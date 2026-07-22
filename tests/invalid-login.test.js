const assert = require("node:assert/strict");

const LoginPage = require("../pages/LoginPage");
const createDriver = require("../utils/driverFactory");
const captureScreenshot = require("../utils/screenshotHelper");

describe("Invalid login functionality", function () {
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
                    "invalid-login"
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

    it("should display an error for invalid credentials", async function () {
        await loginPage.login(
            "wrong-user",
            "wrong-password"
        );

        const errorMessage =
            await loginPage.getErrorMessage();

        assert.ok(
            errorMessage.includes(
                "Username and password do not match"
            ),
            `Unexpected error message: ${errorMessage}`
        );
    });
});