import React from "react";
import TemperatureScale from "./TemperatureScale";
import { renderMainWeatherInfo, renderLocationInfo, weatherCodeToIcon } from "./weatherUtil";
import { useSelector } from "react-redux";
import { selectWeatherLastFetched, selectWeatherUnits } from "../../../services/weatherInfoSlice";
import type { WeatherState } from "../../../services/weatherInfoSlice";

interface CurrentTempTabProps {
    weatherData: WeatherState['data'];
    weatherLoading: boolean;
    onRefresh: () => void;
}

const CurrentTempTab: React.FC<CurrentTempTabProps> = ({
    weatherData,
    weatherLoading,
    onRefresh
}) => {
    const lastFetched = useSelector(selectWeatherLastFetched);
    const units = useSelector(selectWeatherUnits);

    if (weatherLoading) {
        return <div className="p-4 text-center">Loading weather data...</div>;
    }

    if (!weatherData) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    return (
        <>
            <TemperatureScale temperature={weatherData?.current?.temperature_2m || null} units={units} />

            <div className="flex flex-col flex-1 h-full w-0 ml-2">
                <div className="flex flex-1 min-h-0">
                    {/* Temperature Icon Container */}
                    <div className="w-20 flex-shrink-0 pt-8">
                        <div className="bg-[#A0BAE8]">
                            {weatherCodeToIcon(weatherData?.current?.weather_code)}
                        </div>
                    </div>

                    {/* Main weather info container */}
                    <div className="bg-white flex-1 p-1 weather-content-box-shadow weather-content-border font-family-tahoma overflow-x-auto overflow-y-scroll min-h-0 ml-2">
                        {renderMainWeatherInfo(weatherData, units)}
                    </div>
                </div>

                <div className="h-28 flex-shrink-0 flex flex-col w-full mt-2">
                    <div className="bg-white flex-1 p-1 weather-content-box-shadow weather-content-border font-family-tahoma overflow-x-auto overflow-y-scroll min-h-0">
                        {renderLocationInfo(weatherData)}
                    </div>

                    <div className="font-family-pixelated-ms-sans-serif mt-1 flex justify-between items-center">
                        <div className="flex justify-center flex-1">
                            <button
                                onClick={onRefresh}
                                disabled={weatherLoading}
                                className="weather-tab-button px-3 py-1 text-xs"
                            >
                                Refresh
                            </button>
                        </div>

                        <div className="text-xs text-right">
                            Last fetched: {lastFetched ? new Date(lastFetched).toLocaleString() : "N/A"}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CurrentTempTab;