/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_AWS_REGION: string
  readonly VITE_PINPOINT_APP_ID: string
  readonly VITE_GOOGLE_TRANSLATE_API_KEY: string
  readonly VITE_DEEPL_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
