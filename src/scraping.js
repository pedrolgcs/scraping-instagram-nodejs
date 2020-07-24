const puppeeter = require('puppeteer');

// service
const createCaptureLEntry = require('./captureEntry');

// utils
const { getComments, loadMore } = require('./utils/scanData');
const { counted, sorted } = require('./utils/parsedDate');

async function createScraping() {
  const captureEntry = createCaptureLEntry();
  const browser = await puppeeter.launch();

  async function start() {
    try {
      const { link } = await captureEntry.start();

      console.log('> [scraping] Starting done!');
      const page = await browser.newPage();
      await page.goto(link);

      await loadMore(page, '.dCJp8');
      const mentions = await getComments(page, '.C4VMK span a');
      const countedMentions = counted(mentions);
      const rankMentions = sorted(countedMentions);
      rankMentions.forEach((mention) => console.log(mention));
      return rankMentions;
    } catch {
      throw new Error('Error when scraping data');
    }
  }

  async function stop() {
    console.log('> [scraping] Stopping done!');
    await browser.close();
  }

  return { start, stop };
}

module.exports = createScraping;
