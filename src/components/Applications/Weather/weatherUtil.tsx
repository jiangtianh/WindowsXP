import type { WeatherState } from "../../../services/weatherInfoSlice";

const weatherCodeMap = {
    0: ['clear', 'Clear sky'],

    1: ['mostly-clear', 'Mainly clear'],
    2: ['partly-cloudy', 'Partly cloudy'],
    3: ['overcast', 'Overcast'],

    45: ['fog', 'Fog'],
    48: ['rime-fog', 'Rime fog'],

    51: ['light-drizzle', 'Light drizzle'],
    53: ['moderate-drizzle', 'Moderate drizzle'],
    55: ['dense-drizzle', 'Dense drizzle'],

    56: ['light-freezing-drizzle', 'Light freezing drizzle'],
    57: ['dense-freezing-drizzle', 'Dense freezing drizzle'],

    61: ['light-rain', 'Slight rain'],
    63: ['moderate-rain', 'Moderate rain'],
    65: ['heavy-rain', 'Heavy rain'],

    66: ['light-freezing-rain', 'Light freezing rain'],
    67: ['heavy-freezing-rain', 'Heavy freezing rain'],

    71: ['slight-snowfall', 'Slight snowfall'],
    73: ['moderate-snowfall', 'Moderate snowfall'],
    75: ['heavy-snowfall', 'Heavy snowfall'],

    77: ['snowflake', 'Snow grains'],

    80: ['light-rain', 'Slight rain showers'],
    81: ['moderate-rain', 'Moderate rain showers'],
    82: ['heavy-rain', 'Violent rain showers'],

    85: ['slight-snowfall', 'Slight snow showers'],
    86: ['heavy-snowfall', 'Heavy snow showers'],

    95: ['thunderstorm', 'Slight or moderate thunderstorm'],

    96: ['thunderstorm-with-hail', 'Thunderstorm with slight hail'],
    99: ['thunderstorm-with-hail', 'Thunderstorm with heavy hail']
}
const weatherCodeToText = (code: number) => {
    if (code in weatherCodeMap) {
        return (weatherCodeMap as Record<number, string[]>)[code][1];
    }
    return `Unknown weather (code: ${code})`;
}

export const weatherCodeToIcon = (code: number | undefined) => {
    if (code === undefined || code === null) {
        return (
            <img
                src={`/icons/airy/unknown.png`}
                alt="Unknown weather"
                className="w-full h-full object-contain"
            />
        );
    }

    const iconName = code in weatherCodeMap
        ? (weatherCodeMap as Record<number, string[]>)[code][0]
        : 'unknown';

    return (
        <img
            src={`/icons/airy/${iconName}@4x.png`}
            alt={weatherCodeToText(code)}
            className="w-full object-contain"
        />
    );
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