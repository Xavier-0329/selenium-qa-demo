const {Builder, By, until} = require("selenium-webdriver");
const assert = require("node:assert/strict");

async function testInvalidLogin(){
    const driver = await new Builder()
        .forBrowser("chrome")
        .build();

    try{
        await driver.get("https://www.saucedemo.com/");

        await driver
            .findElement(By.id("user-name"))
            .sendKeys("wrong_user");

        await driver
            .findElement(By.id("password"))
            .sendKeys("wrong_password");

        await driver
            .findElement(By.id("login-button"))
            .click();

        const errorElement = await driver.wait(
            until.elementLocated(By.css("[data-test='error']")),
            5000
        );

        const errorMessage = await errorElement.getText();

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