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
export const weatherCodeToText = (code: number) => {
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

export const roundToFixed = (value: number | undefined, digits: number = 1): string => {
    if (value === undefined || value === null || isNaN(value)) return 'N/A';
    return value.toFixed(digits);
}

export const degreesToCompass = (degrees: number): string => {
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

export const renderMainWeatherInfo = (weatherData: WeatherState['data'], units: 'metric' | 'imperial') => {
    if (!weatherData) return null;
    const UNIT = units === 'imperial' ? 'F' : 'C';
    const SPEEDUNIT = units === 'imperial' ? 'mph' : 'km/h';
    const RAINUNIT = units === 'imperial' ? 'in' : 'mm';
    const SNOWUNIT = units === 'imperial' ? 'in' : 'cm';
    return (
        <>
            {weatherData?.current?.time !== undefined && renderTextLine('Observation time', weatherData?.current?.time)}
            {weatherData?.current?.weather_code !== undefined && renderTextLine('Weather', weatherCodeToText(weatherData?.current?.weather_code))}
            {weatherData?.current?.temperature_2m !== undefined && renderTextLine('Temperature', displayTemperature(weatherData?.current?.temperature_2m, units), UNIT)}
            {weatherData?.current?.apparent_temperature !== undefined && renderTextLine('Apparent temperature', displayTemperature(weatherData?.current?.apparent_temperature, units), UNIT)}
            {weatherData?.current?.relative_humidity_2m !== undefined && renderTextLine('Relative humidity', weatherData?.current?.relative_humidity_2m, "%")}

            {weatherData?.current?.wind_direction_10m !== undefined && renderTextLine('Wind direction', degreesToCompass(weatherData?.current?.wind_direction_10m))}
            {weatherData?.current?.wind_speed_10m !== undefined && renderTextLine('Wind speed', roundToFixed(displaySpeed(weatherData?.current?.wind_speed_10m, units), 2), SPEEDUNIT)}
            {weatherData?.current?.wind_gusts_10m !== undefined && renderTextLine('Wind gusts', roundToFixed(displaySpeed(weatherData?.current?.wind_gusts_10m, units), 2), SPEEDUNIT)}

            {weatherData?.current?.pressure_msl !== undefined && renderTextLine('MSL pressure', Math.round(weatherData?.current?.pressure_msl), "hPa")}
            {weatherData?.current?.surface_pressure !== undefined && renderTextLine('Surface pressure', Math.round(weatherData?.current?.surface_pressure), "hPa")}
            {weatherData?.current?.cloud_cover !== undefined && renderTextLine('Cloud cover', weatherData?.current?.cloud_cover, "%")}

            {weatherData?.current?.precipitation !== undefined && renderTextLine('Precipitation', roundToFixed(displayMmToInches(weatherData?.current?.precipitation, units), 2), RAINUNIT)}
            {weatherData?.current?.rain !== undefined && renderTextLine('Rain', roundToFixed(displayMmToInches(weatherData?.current?.rain, units), 2), RAINUNIT)}
            {weatherData?.current?.showers !== undefined && renderTextLine('Showers', roundToFixed(displayMmToInches(weatherData?.current?.showers, units), 2), RAINUNIT)}
            {weatherData?.current?.snowfall !== undefined && renderTextLine('Snowfall', roundToFixed(displayCmToInches(weatherData?.current?.snowfall, units), 2), SNOWUNIT)}
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

// C to F
export const displayTemperature = (temperature: number, unit: 'metric' | 'imperial'): number => {
    if (unit === 'imperial') {
        return Math.round((temperature * 9 / 5) + 32);
    }
    return Math.round(temperature);
}

// km to miles
export const displaySpeed = (speed: number, unit: 'metric' | 'imperial'): number => {
    if (unit === 'imperial') {
        return speed * 0.621371;
    }
    return speed;
}

export const displayMmToInches = (mm: number, unit: 'metric' | 'imperial'): number => {
    if (unit === 'imperial') {
        return mm / 25.4;
    }
    return mm;
}

export const displayCmToInches = (cm: number, unit: 'metric' | 'imperial'): number => {
    if (unit === 'imperial') {
        return cm / 2.54;
    }
    return cm;
}

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[date.getDay()];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${dayName}\n${year}.${month}.${day}`;
};