import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// Set Arabic
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.evaluate(() => localStorage.setItem("mc_lang", "ar"));

for (const route of ["/", "/login", "/register"]) {
  await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const name = route === "/" ? "home" : route.slice(1);
  await page.screenshot({ path: `/tmp/ar-${name}.png`, fullPage: true });
  console.log(`saved ar-${name}.png`);
}

await browser.close();
