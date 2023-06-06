import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          src="https://cdn.jsdelivr.net/gh/herumi/bls-wasm@v1.0.0/browser/bls.js"
          async
        />
        <script
          src="https://cdn.jsdelivr.net/gh/golang/go@go1.18.5/misc/wasm/wasm_exec.js"
          async
        />
        <script
          src="https://github.com/videojs/mux.js/releases/latest/download/mux.js"
          async
        />
      </Head>
      <body>
        <div id="modal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
