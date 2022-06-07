import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
      <script
        type="text/javascript"
        src="https://dashboard.antibot.to/akamai.js"
      ></script>
    </div>
  )
}

export default MyApp
