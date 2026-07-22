const {By, until} = require("selenium-webdriver");
const assert = require("node:assert/strict");
const LoginPage = require("../pages/LoginPage");
const createDriver = require("../utils/driverFactory");

async function testInvalidLogin(){
    const driver = await createDriver();

    try{
        const loginPage = new LoginPage(driver);

        await loginPage.open();
        await loginPage.login("wrong-user","wrong-password");

        const errorElement = await driver.wait(
            until.elementLocated(By.css("[data-test='error']")),
            5000
        );

        const errorMessage = await loginPage.getErrorMessage();

        assert.ok(
            errorMessage.includes("Username and password do not match"),
            `Unexpected error message: ${errorMessage}`
        );

        console.log("PASS: Invalid login test");
    } finally {
        await driver.quit();
    }
}

testInvalidLogin().catch((error) => {
    console.error("FAIL:", error);
    process.exitCode = 1;
});