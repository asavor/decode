import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
      <script type="text/javascript"></script>
    </div>
  )
}

export default MyApp
