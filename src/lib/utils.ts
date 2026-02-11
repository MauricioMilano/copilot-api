import consola from "consola"

import { getModels } from "~/services/copilot/get-models"
import { getVSCodeVersion } from "~/services/get-vscode-version"

import { state } from "./state"

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

export const isNullish = (value: unknown): value is null | undefined =>
  value === null || value === undefined

export async function cacheModels(): Promise<void> {
  const models = await getModels()
  state.models = models
}

export const cacheVSCodeVersion = async () => {
  const response = await getVSCodeVersion()

  const MIN_VERSION = "1.109.2"

  function compareSemver(a: string, b: string) {
    const pa = a.split(".").map((n) => Number(n || 0))
    const pb = b.split(".").map((n) => Number(n || 0))
    const len = Math.max(pa.length, pb.length)
    for (let i = 0; i < len; i++) {
      const na = pa[i] ?? 0
      const nb = pb[i] ?? 0
      if (na > nb) return 1
      if (na < nb) return -1
    }
    return 0
  }

  // Ensure we never advertise a VS Code version older than the minimum required
  state.vsCodeVersion = compareSemver(response, MIN_VERSION) < 0 ? MIN_VERSION : response

  consola.info(`<> Using VSCode version: ${state.vsCodeVersion}`)
}
