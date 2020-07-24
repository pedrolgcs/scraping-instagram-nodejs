const puppeeter = require('puppeteer');

// service
const createCaptureLink = require('./captureLink');

// utils
const { getComments, loadMore } = require('./utils/scanData');
const { counted, sorted } = require('./utils/parsedDate');

async function createScraping() {
  const captureLink = createCaptureLink();

  // inicialize
  const browser = await puppeeter.launch();

  async function start() {
    try {
      const { link } = await captureLink.start();

      console.log('> [scraping] Starting done!');
      const page = await browser.newPage();
      await page.goto(link);

      await loadMore(page, '.dCJp8');
      const mentions = await getComments(page, '.C4VMK span a');
      const countedMentions = counted(mentions);
      const rankMentions = sorted(countedMentions);
      rankMentions.forEach((mention) => console.log(mention));
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
