import React, { useState } from "react";
import { useWeatherData } from "./hook/useWeatherData";
import { useWeatherLocation } from "./hook/useWeatherLocation";
import CurrentTempTab from "./CurrentTempTab";
import OptionsTab from "./OptionsTab";
import ForecastTab from "./ForecastTab";

import "./WeatherContent.css";


const WeatherContent: React.FC = () => {
    const {
        location, locationError, locationLoading, retryLocation
    } = useWeatherLocation();

    const {
        weatherData, weatherLoading, weatherError, refreshWeather
    } = useWeatherData(location);

    type TabType = 'current' | 'forecast' | 'options';
    const tabList: TabType[] = ['current', 'forecast', 'options'];
    const [activeTab, setActiveTab] = useState<TabType>('current');

    const renderCurrentTab = (activeTab: TabType) => {
        switch (activeTab) {
            case 'current':
                return (
                    <CurrentTempTab
                        weatherData={weatherData}
                        weatherLoading={weatherLoading}
                        onRefresh={refreshWeather}
                    />
                );
            case 'forecast':
                return <ForecastTab weatherData={weatherData} />;
            case 'options':
                return (
                    <OptionsTab
                    // onLocationUpdate={setCustomLocation}
                    // onFetchWeather={fetchWeather}
                    />
                );
        }
    };

    if (locationLoading) {
        return <div className="p-4 text-center">Getting your location...</div>;
    }

    if (locationError) {
        return (
            <div className="p-4 flex flex-col items-center justify-center">
                <div className="mb-2 text-red-500 text-center">Error: {locationError}</div>
                <button
                    onClick={retryLocation}
                    className="weather-tab-button px-4 py-2"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (weatherError) {
        return <div className="p-4 text-center text-red-500">Error retrieving weather data: {weatherError}</div>;
    }


    return (
        <div className="flex flex-col h-full w-full overflow-hidden">

            <div className="h-full flex flex-col">

                {/* Tab Buttons */}
                <div className="flex font-family-tahoma py-0.5 px-1 h-6 select-none flex-shrink-0 w-full gap-1 menu-bar-border-bottom">
                    {tabList.map((tab, index) => (
                        <React.Fragment key={index}>
                            <div
                                onClick={() => setActiveTab(tab as TabType)}
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
    );
}
export default WeatherContent;