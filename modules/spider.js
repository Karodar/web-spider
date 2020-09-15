const util = require('../utilities')
const mkdirp = require('mkdirp')
const request = require('superagent')
const extension = require('file-extensions')
const fs = require('fs')
const path = require('path')

const saveFile = (filename, contents, callback) => {
  console.log(filename)
  fs.mkdir(path.dirname(filename), {recursive: true}, err => {
    if (err) {
      return callback(err)
    }
    fs.writeFile(filename, contents, callback)
  })
}

const download = (url, filename, callback) => {
  console.log(`Downloding ${url}`)
  request
    .post(url)
    .end((err, res) => {
      if (err) {
        return callback(err)
      }
      // extension.find(data => {

      // })
      saveFile(filename, res.text, err => {
        if (err) {
          return callback(err)
        }
        console.log(`Downloaded and saved: ${url}`)
      })
    })
}

const spider = (url, callback) => {
  const filename = util.urlToFilename(url)

  fs.exists(filename, exists => {
    if (exists) {
      return callback(null, filename, false)
    }
    download(url, filename, err => {
      if (err) {
        return callback(err)
      }
      callback(null, filename, true)
    })
  })
}
module.exports = spider