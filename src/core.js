// service
const createScraping = require('./scraping');

function createCore() {
  const scraping = createScraping();

  async function start() {
    console.log('> [core] Starting done!');
    await (await scraping).start();
  }

  async function stop() {
    await (await scraping).stop();
    console.log('> [core] Stopping done!');
  }

  return {
    start,
    stop,
  };
}

module.exports = createCore;
