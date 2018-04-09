/**
 * This scripts provide tools to resize a given image or a folder containing
 * images.
 *
 * Usage:
 * $> npm run resizer -- --file foo/bar/baz.jpeg
 * $> npm run resizer -- --folder foo/bar
 */

import path from "path"

import findUp from "find-up"
import minimist from "minimist"

import { resizeFile, resizeFolder } from "../lib/resize"

const rootDirName = path.dirname(findUp.sync(".rootDir", { cwd: __dirname }))

const { file, folder } = minimist(process.argv.slice(2))

if (file) {
  resizeFile(path.join(rootDirName, file)).then(() => {
    console.log("done.")
    process.exit()
  })
} else if (folder) {
  console.log(path.join(rootDirName, folder))
  resizeFolder(path.join(rootDirName, folder)).then(() => {
    console.log("done.")
    process.exit()
  })
} else {
  console.log("You have to provide --file or --folder option")
  process.exit(1)
}
