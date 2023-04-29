import { StoreProvider } from "easy-peasy"
import { store } from "../store/store"
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast';
// import "react-csv-importer/dist/index.css"
import '../index.css'
import Header from "../components/Header/Header";
// import { Html } from "next/document";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { trpc } from "../utils/trpc";
// @ts-ignore
const NoSSRPage = dynamic(() => Promise.resolve(({ children }) => children), {
    ssr: false,
  });
  
  
  
  const App = ({ Component, pageProps, }: AppProps) => {
    return (
        // @ts-ignore
        <NoSSRPage>
        <StoreProvider store={store}>
            <Header />
            <Component {...pageProps} />
            <Toaster />
        </StoreProvider>
        </NoSSRPage>
    )
}

export default trpc.withTRPC(App);
