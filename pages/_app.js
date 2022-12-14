import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>  
        {/*initializeOnMount means no hooking to the server */}
            <Component {...pageProps} />
        </MoralisProvider>
    )
}

export default MyApp
  