import { cacheVSCodeVersion } from "../src/lib/utils"
import { state } from "../src/lib/state"

async function main() {
  try {
    await cacheVSCodeVersion()
    // eslint-disable-next-line no-console
    console.log("VSCode version refreshed:", state.vsCodeVersion)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Failed to refresh VSCode version:", e)
    process.exit(1)
  }
}

void main()
