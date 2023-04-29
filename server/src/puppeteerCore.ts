import puppeteer, { Browser, Page } from 'puppeteer-core';
import { executablePath } from 'puppeteer';

export const getBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: executablePath(),
  });
  return browser;
};

export const closeBrowser = async (browser: Browser) => {
  await browser.close();
};

export const getPage = async (browser: Browser) => {
  const page = await browser.newPage();
  return page;
};

export const goTo = async (page: Page, url: string) => {
  await page.goto(url);
};

export const setViewport = async (page: Page, { width = 1024, height = 1024 }: { width?: number, height?: number }) => {
  await page.setViewport({ width, height });
};

export const typeInEl = async (page: Page, sel: string, text: string) => {
  await page.type(sel, text);
};

export const waitForEl = async (page: Page, sel: string) => {
  const el = await page.waitForSelector(sel);
  return el;
};

export const clickOnEl = async (page: Page, sel: string) => {
  await page.click(sel);
};


