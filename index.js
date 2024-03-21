
import Mustache from 'mustache';
import fetch from 'node-fetch';
import fs from 'fs'

const MUSTACHE_MAIN_DIR = './main.mustache';
let DATA = {
  name: 'Russell',
  date: new Date().toLocaleDateString('en-GB', {
    kanye_quote: 'string',
  }),
};

async function setKanyeQuote() {
  await fetch(
    `https://api.kanye.rest/`
  )
    .then(r => r.json())
    .then(r => {
      DATA.kanye_quote = r.quote;
    });
}

async function generateReadMe() {
  await fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) {
      console.log(err, "errro")
      throw err;
    }
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}

async function action() {
  await setKanyeQuote();   
  await generateReadMe();
}

action();