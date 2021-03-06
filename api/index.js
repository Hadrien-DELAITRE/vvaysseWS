import fs from "fs"
import path from "path"
import url from "url"

import { middleware as cache } from "apicache"
import errorHandler from "api-error-handler"
import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import findUp from "find-up"
import _ from "lodash"

import { config } from "../package.json"
import { listFilesFromDirPath } from "./lib/files"
import asyncError from "./middlewares/asyncError"

Promise.promisifyAll(fs)

const router = express.Router()

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

const api = express()

// Defines cors origin.
router.use(
  cors({
    origin: url.format({
      host: config.www.hostname,
      protocol: config.www.protocol
    })
  })
)

// Specifies our API to use JSON as content-type formatting.
router.use(bodyParser.json())

// Serves portfolio on static server files.
router.use(
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
router.get(
  "/images",
  cache(config.api.images.cache),
  asyncError(async function(req, res) {
    const images = await listFilesFromDirPath(IMAGES_DIR_PATH)
    res.send(
      _.map(images, ({ fileName }) => ({
        imageUrlPath: {
          default: url.format({
            hostname,
            protocol,
            pathname: path.join(
              config.api.prefix,
              PORTFOLIO_STATIC_URL,
              fileName
            )
          }),
          small: url.format({
            hostname,
            protocol,
            pathname: path.join(
              config.api.prefix,
              PORTFOLIO_STATIC_URL,
              config.api.images.resizerFolderName,
              fileName
            )
          })
        }
      }))
    )
  })
)

// Defines error handler middleware for JSON result.
router.use(errorHandler())

api.use(`/${config.api.prefix}`, router)

// Starts API with port and hostname retrieved from config.
api.listen(port, hostname, function() {
  console.log(`API listening on port ${port}`)
})
