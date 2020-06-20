const setupWasi = require('./setup-wasi')

async function main() {
  // Setup the WASI instance.
  const wasi = await setupWasi('./stdio-example.wasm')

  // Get the functions exported from the WebAssembly
  const {
    writeToStdout,
    writeToStderr,
    callPerror
  } = wasi.instance.exports

  let ptr1 = null
  try {
    ptr1 = wasi.wasiMemoryManager.convertFromString('To stdout\n')
    writeToStdout(ptr1.byteOffset)
  } finally {
    wasi.wasiMemoryManager.free(ptr1)
  }

  try {
    ptr1 = wasi.wasiMemoryManager.convertFromString('To stderr\n')
    writeToStderr(ptr1.byteOffset)
  } finally {
    wasi.wasiMemoryManager.free(ptr1)
  }

  callPerror()
}

main().then(() => console.log('Done'))