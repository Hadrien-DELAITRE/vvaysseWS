import express from "express"
import url from "url"

import httpProxy from "http-proxy"

import { config } from "../package.json"

let proxy = httpProxy.createProxyServer({})
proxy.on("error", function(error) {
  console.error(error)
  proxy = httpProxy.createProxyServer({})
})

const apiConfig = config.api
const apiUrl = url.format({
  hostname: apiConfig.hostname,
  port: apiConfig.port,
  protocol: apiConfig.protocol
})
const wwwConfig = config.www
const wwwUrl = url.format({
  hostname: wwwConfig.hostname,
  port: wwwConfig.port,
  protocol: wwwConfig.protocol
})

const reverseProxy = express()

/**
 * Defines reverse proxy to handle client HTTP requests.
 *
 * If received request on port 80 targeting API, then proxifies request through
 * API server. Other requests will be proxified through WWW server.
 *
 *                                           +-----+
 *                                           | API |
 *                      +-------------+------>     |
 * +-------------+      |             |      |:7000|
 * |Incoming HTTP|      |Reverse Proxy|      +-----+
 * |             +------>             |
 * |  Requests   |      |     :80     |      +-----+
 * +-------------+      |             |      | WWW |
 *                      +-------------+------>     |
 *                                           |:7070|
 *                                           +-----+
 *
 * @param  {Object} req Received HTTP request.
 * @param  {Object} res HTTP response to send.
 * @return {String} Matched HTML page to send.
 */
reverseProxy.use("/", function(req, res) {
  if (req.get("host") === apiConfig.hostname) {
    proxy.web(req, res, { target: apiUrl }, function(error) {
      res.status(500).send(error.message)
    })
  } else {
    proxy.web(req, res, { target: wwwUrl }, function(error) {
      res.status(500).send(error.message)
    })
  }
})

reverseProxy.listen(config.proxy.port, config.proxy.hostname, function() {
  console.log(`Proxy listening on port ${config.proxy.port}`)
})
