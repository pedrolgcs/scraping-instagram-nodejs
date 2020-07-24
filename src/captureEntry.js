const readline = require('readline');

// utils
const { functionToPromise } = require('./utils/parsedDate');

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questionFunc = terminal.question.bind(terminal);
const questionAsync = (msg) => functionToPromise(questionFunc, `${msg}`);

function createCaptureEntry() {
  async function start() {
    console.log('> [Capture Link] Starting done!');
    const link = await questionAsync('* Instagram Link: ');
    await stop();
    return {
      link,
    };
  }

  async function stop() {
    await terminal.close();
    console.log('> [Capture Link] Stopping done!');
  }

  return {
    start,
    stop,
  };
}

module.exports = createCaptureEntry;
