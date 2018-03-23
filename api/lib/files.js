import fs from "fs"
import path from "path"

import _ from "lodash"

// Promisifies "fs" function in order to use them in a promise way.
Promise.promisifyAll(fs)

/**
 * Lists files from given dir path.
 *
 * Note: It doesn't list folders, only files.
 *
 * @param  {String} dirPath Directory pathname.
 * @return {Promise(Array<Object>)} Promise of all listed files.
 */
async function listFilesFromDirPath(dirPath) {
  const files = await fs
    .readdirAsync(dirPath)
    .then(files => {
      return Promise.map(files, async file => {
        const filePath = path.join(dirPath, file)
        const fileStat = await fs.statAsync(filePath)
        if (fileStat.isFile()) {
          return { fileName: file }
        }
      })
    })
    // Returns an empty array on fail.
    .catch(() => [])
  return _.compact(files)
}

export { listFilesFromDirPath }
