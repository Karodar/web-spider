const spider = require('./modules/spider')
let urls = ['https://vk.com/login']

spider(urls[0], (err, filename, downloaded) => {
  if (err) {
    return console.log(`#WebSpider has error ${err.message}`)
  }
  if (downloaded) {
    return console.log(`Finish downloading file: ${filename}`)
  }
  console.log(`Denied download file ${filename}`)
})