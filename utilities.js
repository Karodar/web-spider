const urlToFilename = url => {
  let filename = url.substring(url.lastIndexOf('//')+1)
  return filename
}

module.exports = {
  urlToFilename
}