const createCore = require('./src/core');

const core = createCore();

async function main() {
  try {
    await core.start();
    await core.stop();
  } catch (err) {
    console.log('[index] Uncaught error!');
    console.log(err);
    process.exit();
  }
}

main();
