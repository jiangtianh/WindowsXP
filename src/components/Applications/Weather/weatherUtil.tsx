import type { WeatherState } from "../../../services/weatherInfoSlice";


const weatherCodeToText = (code: number): string => {
    if (code === undefined || code === null) return 'N/A';

    switch (code) {
        case 0:
            return 'Clear sky';
        case 1:
            return 'Mainly clear';
        case 2:
            return 'Partly cloudy';
        case 3:
            return 'Overcast';
        case 45:
            return 'Fog';
        case 48:
            return 'Depositing rime fog';
        case 51:
            return 'Light drizzle';
        case 53:
            return 'Moderate drizzle';
        case 55:
            return 'Dense drizzle';
        case 56:
            return 'Light freezing drizzle';
        case 57:
            return 'Dense freezing drizzle';
        case 61:
            return 'Slight rain';
        case 63:
            return 'Moderate rain';
        case 65:
            return 'Heavy rain';
        case 66:
            return 'Light freezing rain';
        case 67:
            return 'Heavy freezing rain';
        case 71:
            return 'Slight snow fall';
        case 73:
            return 'Moderate snow fall';
        case 75:
            return 'Heavy snow fall';
        case 77:
            return 'Snow grains';
        case 80:
            return 'Slight rain showers';
        case 81:
            return 'Moderate rain showers';
        case 82:
            return 'Violent rain showers';
        case 85:
            return 'Slight snow showers';
        case 86:
            return 'Heavy snow showers';
        case 95:
            return 'Slight or moderate thunderstorm';
        case 96:
            return 'Thunderstorm with slight hail';
        case 99:
            return 'Thunderstorm with heavy hail';
        default:
            return `Unknown weather (code: ${code})`;
    }
}

const renderTextLine = (title: string | null = null, text: string | number = "", unit: string = "") => {
    return (
        <div className="text-xs mb-1 whitespace-nowrap tracking-wider">
            {title && (<><span>{title}</span>:</>)} {text} {unit}
        </div>
    );
}

const roundToFixed = (value: number | undefined, digits: number = 1): string => {
    if (value === undefined || value === null || isNaN(value)) return 'N/A';
    return value.toFixed(digits);
}

const degreesToCompass = (degrees: number): string => {
    if (degrees === undefined || degrees === null || isNaN(degrees)) return 'N/A';
    const normalizedDegrees = ((degrees % 360) + 360) % 360;
    const directions = [
        'N', 'NNE', 'NE', 'ENE',
        'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW',
        'W', 'WNW', 'NW', 'NNW'
    ];
    const index = Math.round(normalizedDegrees / 22.5) % 16;
    return `${directions[index]}, ${Math.round(normalizedDegrees)} degrees`;
}

export const renderMainWeatherInfo = (weatherData: WeatherState['data']) => {
    if (!weatherData) return null;

    return (
        <>
            {renderTextLine('Observation time', weatherData?.current?.time)}
            {renderTextLine('Weather', weatherCodeToText(weatherData?.current?.weather_code))}
            {renderTextLine('Temperature', Math.round(weatherData?.current?.temperature_2m), "C")}
            {renderTextLine('Apparent temperature', Math.round(weatherData?.current?.apparent_temperature), "C")}
            {renderTextLine('Relative humidity', weatherData?.current?.relative_humidity_2m, "%")}
            {renderTextLine('Wind direction', degreesToCompass(weatherData?.current?.wind_direction_10m))}
            {renderTextLine('Wind speed', roundToFixed(weatherData?.current?.wind_speed_10m, 4), "km/h")}
            {renderTextLine('Wind gusts', roundToFixed(weatherData?.current?.wind_gusts_10m, 4), "km/h")}
            {renderTextLine('MSL pressure', Math.round(weatherData?.current?.pressure_msl), "hPa")}
            {renderTextLine('Surface pressure', Math.round(weatherData?.current?.surface_pressure), "hPa")}
            {renderTextLine('Precipitation', Math.round(weatherData?.current?.precipitation), "mm")}
            {renderTextLine('Cloud cover', weatherData?.current?.cloud_cover, "%")}
        </>
    );
}

export const renderLocationInfo = (weatherData: WeatherState['data']) => {
    if (!weatherData) return null;
    const coordString = `Lat: ${weatherData?.location?.latitude}, Lon: ${weatherData?.location?.longitude}, Elevation: ${weatherData?.location?.elevation}m`;
    const timezoneString = `Timezone: ${weatherData?.location?.timezone || 'N/A'} (${weatherData?.location?.timezoneAbbreviation})`;
    return (
        <>
            {renderTextLine('Location info')}
            {renderTextLine(null, coordString)}
            {renderTextLine(null, timezoneString)}
        </>
    );
}
