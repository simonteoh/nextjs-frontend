import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from "next/link";
import Navbar from '../components/Navbar';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar></Navbar>
      <Component {...pageProps} />

    </div>
    
  )
}
