import type { Context } from "hono"

export const apiKeyMiddleware = () => {
  const apiKey = process.env.API_KEY ?? process.env.APIKEY ?? ""

  return async (c: Context, next: () => Promise<void>) => {
    if (!apiKey) {
      console.warn("API key not set (API_KEY or APIKEY). Skipping validation.")
      await next()
      return
    }

    const xApiKey = c.req.header("x-api-key")
    const auth = c.req.header("authorization") ?? ""
    const bearer =
      auth.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : null
    const provided = xApiKey ?? bearer

    if (!provided || provided !== apiKey) {
      return c.json({ error: "Unauthorized" }, 401)
    }

    await next()
  }
}
