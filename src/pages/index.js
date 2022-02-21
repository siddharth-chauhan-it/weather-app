import WebsiteContainer from "../components/WebsiteContainer";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <WebsiteContainer>
        <div className="mt-s20 font-quaternary">
          <h1 className="text-subtitle1">API</h1>
          <div className="mt-s20 underline">
            <Link href="/weather">
              <a>WeatherAPI</a>
            </Link>
          </div>
        </div>
      </WebsiteContainer>
    </div>
  );
}
