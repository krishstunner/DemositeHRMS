import "@/styles/globals.css";
import localFont from "@next/font/local";

// const nasalization = localFont({
//   src: [
//     {
//       path: "../public/fonts/Nasalization-Font",
//       weight: "400",
//     },
//   ],
//   variable: "--font-nasalization",
// });

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
