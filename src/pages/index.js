import Head from "next/head";
import WebsiteContainer from "../components/WebsiteContainer";
import Weather from "../components/Weather";

export default function Home() {
  return (
    <div>
      <Head>
        <title>WeatherAPI</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WebsiteContainer>
        <Weather />
      </WebsiteContainer>
    </div>
  );
}
