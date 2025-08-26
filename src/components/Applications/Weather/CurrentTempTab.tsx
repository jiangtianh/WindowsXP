import TemperatureScale from "./TemperatureScale";
import { renderMainWeatherInfo, renderLocationInfo } from "./weatherUtil";
import { useSelector } from "react-redux";
import { selectWeatherData, selectWeatherLastFetched } from "../../../services/weatherInfoSlice";

const CurrentTempTab: React.FC = () => {
    const weatherData = useSelector(selectWeatherData);
    const lastFetched = useSelector(selectWeatherLastFetched);

    return (
        <>
            <TemperatureScale temperature={weatherData?.current?.temperature_2m || null} />

            <div className="flex flex-col flex-1 h-full w-0 ml-2">

                <div className="flex flex-1 min-h-0">

                    {/* Temperature Icon Container */}
                    <div className="w-22 flex-shrink-0">
                        placeholder
                    </div>

                    {/* Main weather info container */}
                    <div
                        className="bg-white flex-1 p-1 weather-content-box-shadow weather-content-border 
                        font-family-tahoma overflow-x-auto overflow-y-scroll min-h-0"
                    >
                        {renderMainWeatherInfo(weatherData)}
                    </div>

                </div>


                <div className="h-24 flex-shrink-0 flex flex-col w-full mt-2">

                    <div
                        className="bg-white flex-1 p-1 weather-content-box-shadow weather-content-border
                        font-family-tahoma overflow-x-auto overflow-y-scroll min-h-0"
                    >
                        {renderLocationInfo(weatherData)}
                    </div>
                    <div className="font-family-pixelated-ms-sans-serif text-right mt-1">
                        Last fetched: {lastFetched ? new Date(lastFetched).toLocaleString() : "N/A"}
                    </div>

                </div>
            </div>
        </>
    )
};
export default CurrentTempTab;