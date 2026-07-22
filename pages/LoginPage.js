const {By, until} = require("selenium-webdriver");

class LoginPage{
    constructor(driver){
        this.driver = driver;

        this.usernameInput = By.id("user-name");
        this.passwordInput = By.id("password");
        this.loginButton = By.id("login-button");
        this.errorMessage = By.css("[data-test='error']");
    }

    async open(){
        await this.driver.get("https://www.saucedemo.com/");
    }

    async login(username, password){
        await this.driver
            .findElement(this.usernameInput)
            .sendKeys(username);

        await this.driver
            .findElement(this.passwordInput)
            .sendKeys(password);

        await this.driver
            .findElement(this.loginButton)
            .click();
    }

    async getErrorMessage() {
        const element = await this.driver.wait(
            until.elementLocated(this.errorMessage),
            5000
        );

        return element.getText();
    }
}

module.exports = LoginPage;