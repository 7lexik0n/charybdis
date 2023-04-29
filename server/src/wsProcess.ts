import { ECommands, IWsAnswer, IWsMessage } from './types';
import { clickOnEl, closeBrowser, getBrowser, getPage, goTo, setViewport, typeInEl, waitForEl } from './puppeteerCore';

export const switchWsMessage = async (data: IWsMessage): Promise<string> => {
  const { type, payload } = data;
  const result: IWsAnswer = {
    message: ``,
  };

  switch (type) {
    case ECommands.TEST: {
      const browser = await getBrowser();
      const page = await getPage(browser);

      await goTo(page, 'https://developer.chrome.com/');
      await setViewport(page, { width: 1024, height: 1024 });

      await typeInEl(page, '.search-box__input', 'automate beyond recorder');

      await waitForEl(page, '.search-box__link');
      await clickOnEl(page, '.search-box__link');

      const textEl = await waitForEl(page, 'text/Customize and automate');
      let title = `Default title`;
      if (textEl) {
        const fullTitle = await textEl.evaluate((el) => el.textContent);
        title = fullTitle ? fullTitle : title;
      }

      result.message = title;
      await closeBrowser(browser);
      break;
    }
    default: {
      result.message = `Received unknown command!`;
    }
  }

  return JSON.stringify(result);
};
