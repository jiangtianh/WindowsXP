import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import type { AppDispatch } from "../../../services/store";
import { selectClientInfo, getSystemInfo } from "../../../services/clientInfoSlice";
import {
    fetchWeatherData,
    selectWeatherData,
    selectWeatherLoading,
    selectWeatherError,
    shouldRefreshWeather
} from "../../../services/weatherInfoSlice";
import { useDispatch } from "react-redux";

const WeatherContent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const clientInfoSlice = useSelector(selectClientInfo);

    const weatherData = useSelector(selectWeatherData);
    const weatherLoading = useSelector(selectWeatherLoading);
    const weatherError = useSelector(selectWeatherError);
    const needsRefresh = useSelector(shouldRefreshWeather);

    useEffect(() => {
        if (!clientInfoSlice.fetched) {
            dispatch(getSystemInfo());
        }
    }, [clientInfoSlice.fetched, dispatch]);

    let latitude = null; let longitude = null;
    if (clientInfoSlice.coordinates) {
        const splitedLocation = clientInfoSlice.coordinates.split(" ");
        latitude = parseFloat(splitedLocation[0]);
        longitude = parseFloat(splitedLocation[2]);
    }

    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            if (!weatherData || needsRefresh) {
                console.log("Fetching weather data...");
                dispatch(fetchWeatherData({ latitude, longitude }));
            }
        }
    }, [latitude, longitude, weatherData, needsRefresh, dispatch]);

    console.log(weatherData);

    return (
        <div className={`flex flex-col h-full w-full overflow-hidden`}>
            <div className="flex items-center justify-center h-full w-full text-gray-500">
                Weather App is under development.
            </div>
        </div>
    )
};
export default WeatherContent;