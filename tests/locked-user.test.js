const assert = require("node:assert/strict");
const LoginPage = require("../pages/LoginPage");
const createDriver = require("../utils/driverFactory");

async function testLockedUserLogin() {
  const driver = await createDriver();

  try {
    const loginPage = new LoginPage(driver);

    await loginPage.open();
    await loginPage.login("locked_out_user", "secret_sauce");

    const errorMessage = await loginPage.getErrorMessage();

    assert.equal(
      errorMessage,
      "Epic sadface: Sorry, this user has been locked out.",
      `Unexpected error message: ${errorMessage}`,
    );

    console.log("PASS: Locked user login test");
  } finally {
    await driver.quit();
  }
}

testLockedUserLogin().catch((error) => {
  console.error("FAIL:", error);
  process.exitCode = 1;
});
