const {until} = require("selenium-webdriver");
const assert = require("node:assert/strict");
const LoginPage = require("../pages/LoginPage");
const createDriver = require("../utils/driverFactory");

async function testValidLogin(){
    const driver = await createDriver();

    try{
        const loginPage = new LoginPage(driver);

        await loginPage.open();
        await loginPage.login("standard_user","secret_sauce");

        await driver.wait(
            until.urlContains("inventory"),
            5000
        );

        assert.ok(
            (await driver.getCurrentUrl()).includes("inventory"),
            "Expected user to reach the inventroy page"
        );

        console.log("PASS: Valid login test")
    } finally {
        await driver.quit();
    }       
}

testValidLogin().catch((error) => {
    console.error("FAIL:", error);
    process.exitCode = 1;
});