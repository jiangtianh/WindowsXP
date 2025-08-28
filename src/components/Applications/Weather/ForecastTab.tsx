import { useSelector } from "react-redux";
import { selectWeatherUnits, type WeatherState } from "../../../services/weatherInfoSlice";
import { formatDate, displayTemperature, displaySpeed, weatherCodeToIcon, weatherCodeToText, degreesToCompass, roundToFixed, displayMmToInches } from "./weatherUtil";

interface ForecastTabProps {
    weatherData: WeatherState['data'];
}

const ForecastTab: React.FC<ForecastTabProps> = ({ weatherData }) => {
    const units = useSelector(selectWeatherUnits);

    const TEMPUNIT = units === 'imperial' ? 'F' : 'C';
    const SPEEDUNIT = units === 'imperial' ? 'mph' : 'km/h';
    const RAINUNIT = units === 'imperial' ? 'in' : 'mm';

    if (!weatherData?.daily) {
        return <div>No forecast data available...</div>;
    }
    console.log(weatherData?.daily);
    return (
        <div className="w-full h-full overflow-auto">
            <table className="w-full h-full border-collapse font-family-tahoma text-xs weather-content-border">
                <thead className="weather-content-box-shadow">
                    <tr>
                        <th className="p-2 text-left w-2/10 weather-content-border">Date</th>
                        <th className="p-2 text-left w-1/10 weather-content-border">Low</th>
                        <th className="p-2 text-left w-1/10 weather-content-border">High</th>
                        <th className="p-2 text-left w-4/10 weather-content-border">Description</th>
                        <th className="p-2 text-left w-2/10 weather-content-border">Weather</th>
                    </tr>
                </thead>

                <tbody>
                    {weatherData.daily.time.map((dateString, index) => {
                        const isToday = index === 0; // First day is usually today
                        const rowClass = isToday ? "bg-blue-200" : "bg-white hover:bg-gray-50";

                        return (
                            <tr key={index} className={rowClass}>
                                {/* Date */}
                                <td className="border border-gray-400 p-2 whitespace-pre-line text-xs">
                                    {formatDate(dateString)}
                                </td>

                                {/* Low Temperature */}
                                <td className="border border-gray-400 p-2">
                                    {displayTemperature(weatherData.daily.temperature_2m_min[index], units)} {TEMPUNIT}
                                </td>

                                {/* High Temperature */}
                                <td className="border border-gray-400 p-2">
                                    {displayTemperature(weatherData.daily.temperature_2m_max[index], units)} {TEMPUNIT}
                                </td>

                                {/* Description */}
                                <td className="border border-gray-400 p-2">
                                    <div className="text-xs">
                                        <div className="font-semibold mb-1">
                                            {weatherCodeToText(weatherData.daily.weather_code[index])}
                                        </div>
                                        <div>Precipitation: {roundToFixed(displayMmToInches(weatherData.daily.precipitation_sum[index], units), 2)}{` ${RAINUNIT}`}</div>
                                        <div>
                                            Wind: {roundToFixed(displaySpeed(weatherData.daily.wind_speed_10m_max[index], units), 2)}{` ${SPEEDUNIT}`} {' '}
                                            {degreesToCompass(weatherData.daily.wind_direction_10m_dominant[index])}
                                        </div>
                                    </div>
                                </td>

                                {/* Weather Icon */}
                                <td className="border border-gray-400 p-1 align-middle">
                                    <div
                                        className="bg-blue-300 flex items-center justify-center mx-auto"
                                        style={{
                                            width: 'calc(100% - 8px)',
                                            height: 'calc(100% - 8px)',
                                            aspectRatio: '1 / 1',
                                            maxWidth: '60px',
                                            maxHeight: '60px'
                                        }}
                                    >
                                        {weatherCodeToIcon(weatherData.daily.weather_code[index])}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
};
export default ForecastTab;
