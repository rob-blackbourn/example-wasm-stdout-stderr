const fs = require('fs')
const Wasi = require('./wasi')

async function setupWasi(fileName) {
  // Read the wasm file.
  const buf = fs.readFileSync(fileName)

  // Create the Wasi instance passing in some environment variables.
  const wasi = new Wasi({
    "LANG": "en_GB.UTF-8",
    "TERM": "xterm"
  })

  // Instantiate the wasm module.
  const res = await WebAssembly.instantiate(buf, {
    wasi_snapshot_preview1: wasi
  })

  // Initialise the wasi instance
  wasi.init(res.instance)

  return wasi
}

module.exports = setupWasi
