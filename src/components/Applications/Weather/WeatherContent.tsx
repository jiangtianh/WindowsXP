import React from "react";
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
import CurrentTempTab from "./CurrentTempTab";
import ForecastTab from "./ForecastTab";

import "./WeatherContent.css";

const WeatherContent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const weatherData = useSelector(selectWeatherData);
    const weatherLoading = useSelector(selectWeatherLoading);
    const weatherError = useSelector(selectWeatherError);
    const needsRefresh = useSelector(shouldRefreshWeather);
    const clientInfoSlice = useSelector(selectClientInfo);

    type tabType = 'current' | 'forecast';
    const tabList: tabType[] = ['current', 'forecast'];
    const [activeTab, setActiveTab] = useState<tabType>('current');

    const [location, setLocation] = useState<{ lat: number, lon: number } | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [locationLoading, setLocationLoading] = useState(false);
    const [locationAttempted, setLocationAttempted] = useState(false);

    const getCurrentLocation = () => {
        setLocationLoading(true);
        setLocationError(null);

        if (!navigator.geolocation) {
            console.log("Browser geolocation not supported, trying ClientInfo fallback...");
            tryClientInfoFallback();
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
                setLocationLoading(false);
            },
            (error) => {
                console.log("Browser geolocation failed: ", error);
                tryClientInfoFallback();
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 1000 * 60 * 60
            }
        )
    };

    // Fallback to ClientInfo coordinates if browser location failed
    const tryClientInfoFallback = () => {
        console.log("Trying ClientInfo coordinates as fallback...");

        if (clientInfoSlice.coordinates) {
            const splitedLocation = clientInfoSlice.coordinates.split(" ");
            const latitude = parseFloat(splitedLocation[0]);
            const longitude = parseFloat(splitedLocation[2]);
            console.log(`ClientInfo coordinates found: ${latitude}, ${longitude}`);

            if (!isNaN(latitude) && !isNaN(longitude)) {
                console.log("ClientInfo coordinates found and valid");
                setLocation({ lat: latitude, lon: longitude });
                setLocationLoading(false);
            } else {
                console.log("ClientInfo coordinates invalid");
                setLocationError("Unable to get location from browser or system info");
                setLocationLoading(false);
            }
        } else {
            console.log("ClientInfo coordinates not available");
            setLocationError("Unable to get location from browser or system info");
            setLocationLoading(false);
        }
    };

    // Fetch system information if not already fetched
    useEffect(() => {
        if (!clientInfoSlice.fetched) {
            dispatch(getSystemInfo());
        }
    }, [clientInfoSlice.fetched, dispatch]);

    useEffect(() => {
        if (clientInfoSlice.fetched && !locationAttempted) {
            setLocationAttempted(true);
            getCurrentLocation();
        }
    }, [clientInfoSlice.fetched, locationAttempted]);


    useEffect(() => {
        if (location && (!weatherData || needsRefresh)) {
            console.log("Fetching weather data...");
            dispatch(fetchWeatherData({
                latitude: location.lat,
                longitude: location.lon
            }));
        }
    }, [location, weatherData, needsRefresh, dispatch]);


    const renderCurrentTab = (activeTab: tabType) => {
        switch (activeTab) {
            case 'current':
                return <CurrentTempTab />;
            case 'forecast':
                return <ForecastTab />;
        }
    };

    if (locationLoading) {
        return <div className="p-4 text-center">Getting your location...</div>
    }

    if (locationError) {
        return (
            <div className="p-4 flex flex-col items-center justify-center">
                <div className="mb-2 text-red-500 text-center">Error: {locationError}</div>
                <button
                    onClick={() => {
                        setLocationError(null);
                        setLocation(null);
                        setLocationAttempted(false);
                    }}
                >
                    Try Again
                </button>
            </div >
        );
    }

    if (weatherLoading) {
        return <div className="p-4 text-center">Loading weather data...</div>
    }

    if (weatherError) {
        return <div className="p-4 text-center text-red-500">Error retrieving weather data: {weatherError}</div>
    }

    if (!weatherData) {
        return <div className="p-4 text-center">No weather data available</div>
    }


    return (
        <div className="flex flex-col h-full w-full overflow-hidden">

            <div className="h-full flex flex-col">

                {/* Tab Buttons */}
                <div className="flex font-family-tahoma py-0.5 px-1 h-6 select-none flex-shrink-0 w-full gap-1 menu-bar-border-bottom">
                    {tabList.map((tab, index) => (
                        <React.Fragment key={index}>
                            <div
                                onClick={() => setActiveTab(tab as tabType)}
                                className={`
                                flex-1 flex items-center justify-center cursor-pointer capitalize 
                                ${activeTab === tab ? 'weather-tab-button-selected' : 'weather-tab-button'}
                                `}
                            >
                                {tab}
                            </div>
                            {index < tabList.length - 1 && (
                                <div className="h-7/8 w-px bg-[#C0C0C0] self-center"></div>
                            )}
                        </React.Fragment>
                    ))}
                </div >

                <div className="flex flex-1 p-4 min-h-0">
                    {renderCurrentTab(activeTab)}
                </div>

            </div>
        </div >
    )
};
export default WeatherContent;