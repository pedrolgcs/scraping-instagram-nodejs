async function loadMore(page, selector) {
  const moreButton = await page.$(selector);
  if (moreButton) {
    console.log('click more...');
    await moreButton.click();
    await page
      .waitFor(selector, { timeout: 3000 })
      .catch(() => console.log('timeout'));
    await loadMore(page, selector);
  }
}

async function getComments(page, selector) {
  const comments = await page.$$eval(selector, (links) =>
    links.map((link) => link.innerText)
  );
  return comments;
}

module.exports = { loadMore, getComments };
