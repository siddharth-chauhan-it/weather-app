import React, { useEffect, useState } from "react";
import LocationIcon from "../../static/icons/location.svg";

function Weather() {
  const [place, setPlace] = useState("California");
  const [placeInfo, setPlaceInfo] = useState({});
  const [inputValue, setInputValue] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        setPlace(`${position.coords.latitude},${position.coords.longitude}`);
      });
    }
  };

  // setTimeout(() => getLocation(), 2000);

  useEffect(() => {
    const handlefetch = () => {
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=16e99a28ab44432f86a121614221902&q=${place}&days=1&aqi=no&alerts=no`
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // setPlaceInfo(data);
          if (data.location) {
            setPlaceInfo({
              name: data.location.name,
              region: data.location.region,
              country: data.location.country,
              latitude: data.location.lat,
              longitude: data.location.lon,
              timeZone: data.location.tz_id,
              temperature: {
                celsius: {
                  now: data.current.temp_c,
                  high: data.forecast.forecastday[0].day.maxtemp_c,
                  low: data.forecast.forecastday[0].day.mintemp_c,
                },
                farenheit: {
                  now: data.current.temp_f,
                  high: data.forecast.forecastday[0].day.maxtemp_f,
                  low: data.forecast.forecastday[0].day.mintemp_f,
                },
              },
              condition: data.current.condition.text,
            });
          }
        });
    };
    handlefetch();
    return () => {};
  }, [place]);

  return (
    <div className="px-s12">
      {placeInfo.country && (
        <div className="font-primary mx-auto mt-s40 sm:w-[400px] border rounded-24 p-s20">
          <h1 className="font-quaternary text-subtitle2 font-bold">
            WeatherAPI
          </h1>
          <div className="mt-s20">
            <p>Name: {placeInfo.name}</p>
            <p>Region: {placeInfo.region}</p>
            <p>Country: {placeInfo.country}</p>
            <p>TimeZone: {placeInfo.timeZone}</p>
            <p>Max: {placeInfo.temperature?.celsius.high + " °C"}</p>
            <p>Min: {placeInfo.temperature?.celsius.low + " °C"}</p>
            <p>Now: {placeInfo.temperature?.celsius.now + " °C"}</p>
            <p>Condition: {placeInfo.condition}</p>
          </div>
          <input
            onChange={e => {
              setInputValue(e.target.value);
              setPlace(e.target.value);
            }}
            type="text"
            name=""
            id=""
            value={inputValue}
            className="border rounded-4 w-full h-s40 mt-s20 px-s8 text-subtitle4 font-quaternary"
          />
          <button
            onClick={() => {
              getLocation();
              setInputValue("");
            }}
            className="px-s12 flex items-center justify-center mt-s12 w-full h-s32 rounded-full duration-300 text-body1 font-quaternary text-white bg-orange-500 hover:bg-orange-600 "
          >
            <p className="mr-s8">Current Location</p>{" "}
            <LocationIcon fill="white" width={20} />
          </button>

          {/* <div className="">{JSON.stringify(placeInfo)}</div> */}
        </div>
      )}
    </div>
  );
}

export default Weather;
