import { Application } from "spectron";
import path from "path";

import { setupBrowser } from "@testing-library/webdriverio";

const packageName = process.env.npm_package_name;
const app = new Application({
  path: path.join(
    process.cwd(), // This works assuming you run npm test from project root
    `out/${packageName}-darwin-x64/${packageName}.app/Contents/MacOS/${packageName}`
  ),
  port: 9156,
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

  test("should display heading", async () => {
    const { getByRole } = setupBrowser(app.client);

    expect(
      await getByRole("heading", { name: /hello from react!/i })
    ).toBeDefined();
  });

  test("should add heading when button is clicked", async () => {
    const { getByRole } = setupBrowser(app.client);

    const button = await getByRole("button", { name: /click me/i });
    button.click();

    expect(
      await getByRole("heading", { name: /clicking happened!/i })
    ).toBeDefined();
  });
});
