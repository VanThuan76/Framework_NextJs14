import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
export const env = createEnv({
    /**
     * Specify your client-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars. To expose them to the client, prefix them with `NEXT_PUBLIC_`.
   */
   client:{
    NEXT_PUBLIC_INTL_PROVIDER: z.string().optional(),
   },
  /**
    * You can't destruct `process.env` as a regular object in the Next.js edge runtimes
    * (for example the middlewares) or client-side so we need to destruct it manually.
   */
  runtimeEnv: {
    NEXT_PUBLIC_INTL_PROVIDER: process.env.NEXT_PUBLIC_INTL_PROVIDER,
  }

})