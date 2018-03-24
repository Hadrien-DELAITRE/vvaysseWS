import fs from "fs"
import path from "path"

import { middleware as cache } from "apicache"
import bodyParser from "body-parser"
import express from "express"
import findUp from "find-up"

import { config } from "../package.json"
import { listFilesFromDirPath } from "./lib/files"

Promise.promisifyAll(fs)

const app = express()

// Specifies our API to use JSON as content-type formatting.
app.use(bodyParser.json())

// Defines images dir path.
const rootDirName = path.dirname(findUp.sync(".rootDir", { cwd: __dirname }))
const IMAGES_DIR_PATH = path.join(rootDirName, config.www.portfolioDirPath)

/**
 * Defines /images route.
 * It reads and returns all filenames (and not directories) of `images.dirPath`
 * folder.
 *
 * Note: this route uses application cache because files disk accesses are
 * generally slow.
 *
 * @param  {Object} req Received HTTP request.
 * @param  {Object} res HTTP response to send.
 * @return {Array<Object>} Returns all filenames.
 */
app.get("/images", cache(config.api.images.cache), async function(req, res) {
  const images = await listFilesFromDirPath(IMAGES_DIR_PATH)
  res.send(images)
})

// Starts API with port and hostname retrieved from config.
app.listen(config.api.port, config.api.hostname, function() {
  console.log(`API listening on port ${config.api.port}`)
})
