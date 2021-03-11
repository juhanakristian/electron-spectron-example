import { Application } from "spectron";
import path from "path";

import { setupBrowser } from "@testing-library/webdriverio";

const app = new Application({
  path: path.join(
    __dirname,
    "..",
    "..",
    "out",
    "electron-spectron-example-darwin-x64/electron-spectron-example.app/Contents/MacOS/electron-spectron-example"
  ),
});

describe("App", () => {
  beforeEach(async () => {
    await app.start();
  });

  afterEach(async () => {
    if (app && app.isRunning()) await app.stop();
  });

  test("should launch app", async () => {
    const isVisible = await app.browserWindow.isVisible();
    expect(isVisible).toBe(true);
  });

  test("should display heading when button is clicked", async () => {
    const { getByRole } = setupBrowser(app.client);

    const button = await getByRole("button", { name: /click me/i });
    button.click();

    expect(
      await getByRole("heading", { name: /clicking happened!/i })
    ).toBeDefined();
  });
});
