import fs from "fs"
import path from "path"
import url from "url"

import { middleware as cache } from "apicache"
import bodyParser from "body-parser"
import express from "express"
import findUp from "find-up"
import _ from "lodash"

import { config } from "../package.json"
import { listFilesFromDirPath } from "./lib/files"

Promise.promisifyAll(fs)

// Defines portfolio static URL.
const PORTFOLIO_STATIC_URL = "/portfolio"

// Defines images dir path.
const rootDirName = path.dirname(findUp.sync(".rootDir", { cwd: __dirname }))
const IMAGES_DIR_PATH = path.join(
  rootDirName,
  config.api.images.portfolioDirPath
)

// Retrieves API server connection data.
const { hostname, port, protocol } = config.api

const app = express()

// Specifies our API to use JSON as content-type formatting.
app.use(bodyParser.json())

// Serves portfolio on static server files.

app.use(
  PORTFOLIO_STATIC_URL,
  express.static(config.api.images.portfolioDirPath)
)

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
  res.send(
    _.map(images, ({ fileName }) => ({
      imageUrlPath: url.format({
        hostname,
        port,
        protocol,
        pathname: path.join(PORTFOLIO_STATIC_URL, fileName)
      })
    }))
  )
})

// Starts API with port and hostname retrieved from config.
app.listen(config.api.port, config.api.hostname, function() {
  console.log(`API listening on port ${config.api.port}`)
})
