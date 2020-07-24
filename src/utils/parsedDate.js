function counted(mentions = []) {
  const count = {};
  mentions.forEach((mention) => (count[mention] = (count[mention] || 0) + 1));
  return count;
}

function sorted(mentions = {}) {
  const data = Object.entries(mentions);
  const sortedData = data.sort((a, b) => b[1] - a[1]);
  return sortedData;
}

module.exports = { counted, sorted };
