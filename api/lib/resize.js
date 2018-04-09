import path from "path"

import jimp from "jimp"

import { listFilesFromDirPath } from "./files"

import { config } from "../../package.json"

/**
 * Resizes given file URL path with scale defined in config.
 *
 * @param {String} fileUrlPath File URL path to resize.
 * @return {Promise} Promise that resize is done.
 */
async function resizeFile(fileUrlPath) {
  return jimp.read(fileUrlPath).then(image => {
    console.log("file:", fileUrlPath, "resizing...")
    return new Promise((resolve, reject) => {
      const resizedImagePath = path.join(
        path.dirname(fileUrlPath),
        config.api.images.resizerFolderName,
        path.basename(fileUrlPath)
      )
      return image.resize(460, jimp.AUTO).write(resizedImagePath, err => {
        if (err) {
          reject(err)
        } else {
          resolve(resizedImagePath)
        }
      })
    })
  })
}

/**
 * Resizes given folder URL path with scale defined in config.
 *
 * Note: it resize all files in folder.
 *
 * @param {String} folderImagesUrlPath Folder URL path to resize.
 * @return {Promise} Promise that resize is done.
 */
async function resizeFolder(folderImagesUrlPath) {
  await listFilesFromDirPath(folderImagesUrlPath).then(async images => {
    await Promise.mapSeries(images, imageItem => {
      return resizeFile(path.join(folderImagesUrlPath, imageItem.fileName))
    })
  })
}

export { resizeFolder }
export { resizeFile }
