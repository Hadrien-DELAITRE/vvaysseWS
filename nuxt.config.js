const nodeExternals = require("webpack-node-externals")
const webpack = require("webpack")

const { config } = require("./package.json")

// For any documentation about Nuxt configuration, @see
// https://fr.nuxtjs.org/guide/configuration/
module.exports = {
  head: {
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
      }
    ]
  },
  dev: process.env.NODE_ENV !== "production",
  srcDir: config.www.srcDir,
  modules: [
    ["@nuxtjs/axios"],
    ["nuxt-sass-resources-loader", "@/assets/css/colors.scss"],
    ["nuxt-sass-resources-loader", "@/assets/css/functions.scss"],
    ["nuxt-sass-resources-loader", "@/assets/css/variables.scss"]
  ],
  serverMiddleware: ["~/serverMiddleware/config"],
  build: {
    vendor: ["vue-awesome", "vue-lazyload"],
    extend(config, { isServer }) {
      if (isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [
              /es6-promise|\.(?!(?:js|json)$).{1,5}$/i,
              /^vue-awesome/
            ]
          })
        ]
      }
      const urlLoader = config.module.rules.find(
        rule => rule.loader === "url-loader"
      )
      urlLoader.test = /\.(png|jpe?g|gif)$/

      config.module.rules.push({
        test: /\.svg$/,
        loader: "vue-svg-loader",
        exclude: /node_modules/
      })
    },
    plugins: [
      new webpack.ProvidePlugin({
        _: "lodash"
      })
    ]
  },
  plugins: ["~plugins/vueAwesome.js", "~plugins/vueLazyload.js"],
  css: [
    "@/assets/css/animations.scss",
    "@/assets/css/colors.scss",
    "@/assets/css/fonts.scss",
    "@/assets/css/reset.scss"
  ]
}
