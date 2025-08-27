import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchWeatherApi } from "openmeteo";
import type { RootState } from "./store";

const OPEN_METEO_API_URL = "https://api.open-meteo.com/v1/forecast";

interface WeatherData {
    current: {
        time: string;
        wind_gusts_10m: number;
        wind_direction_10m: number;
        wind_speed_10m: number;
        apparent_temperature: number;
        relative_humidity_2m: number;
        temperature_2m: number;
        is_day: number;
        precipitation: number;
        rain: number;
        showers: number;
        snowfall: number;
        weather_code: number;
        cloud_cover: number;
        pressure_msl: number;
        surface_pressure: number;
    };
    daily: {
        time: string[];
        weather_code: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        wind_speed_10m_max: number[];
        wind_direction_10m_dominant: number[];
        precipitation_sum: number[];
    };
    location: {
        latitude: number;
        longitude: number;
        elevation: number;
        timezone: string | null;
        timezoneAbbreviation: string | null;
        utcOffsetSeconds: number;
    };
};

export interface WeatherState {
    data: WeatherData | null;
    lastFetched: number | null;
    loading: boolean;
    error: string | null;
};

const initialState: WeatherState = {
    data: null,
    lastFetched: null,
    loading: false,
    error: null,
};

export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async ({ latitude, longitude }: { latitude: number, longitude: number }) => {
        const params = {
            "latitude": latitude,
            "longitude": longitude,
            "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "wind_speed_10m_max", "wind_direction_10m_dominant", "precipitation_sum"],
            "current": ["wind_gusts_10m", "wind_direction_10m", "wind_speed_10m", "apparent_temperature", "relative_humidity_2m", "temperature_2m", "is_day", "precipitation", "rain", "showers", "snowfall", "weather_code", "cloud_cover", "pressure_msl", "surface_pressure"],
            "timezone": "auto",
            "forecast_days": 5,
            "timeformat": "unixtime",
        };
        const responses = await fetchWeatherApi(OPEN_METEO_API_URL, params);
        const response = responses[0];
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const current = response.current()!;
        const daily = response.daily()!;
        const weatherData: WeatherData = {
            current: {
                time: new Date(Number(current.time()) * 1000).toString(),
                wind_gusts_10m: current.variables(0)!.value(),
                wind_direction_10m: current.variables(1)!.value(),
                wind_speed_10m: current.variables(2)!.value(),
                apparent_temperature: current.variables(3)!.value(),
                relative_humidity_2m: current.variables(4)!.value(),
                temperature_2m: current.variables(5)!.value(),
                is_day: current.variables(6)!.value(),
                precipitation: current.variables(7)!.value(),
                rain: current.variables(8)!.value(),
                showers: current.variables(9)!.value(),
                snowfall: current.variables(10)!.value(),
                weather_code: current.variables(11)!.value(),
                cloud_cover: current.variables(12)!.value(),
                pressure_msl: current.variables(13)!.value(),
                surface_pressure: current.variables(14)!.value(),
            },
            daily: {
                time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
                    (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000).toISOString() // Convert to ISO strings
                ),
                weather_code: Array.from(daily.variables(0)?.valuesArray() || []),
                temperature_2m_max: Array.from(daily.variables(1)?.valuesArray() || []),
                temperature_2m_min: Array.from(daily.variables(2)?.valuesArray() || []),
                wind_speed_10m_max: Array.from(daily.variables(3)?.valuesArray() || []),
                wind_direction_10m_dominant: Array.from(daily.variables(4)?.valuesArray() || []),
                precipitation_sum: Array.from(daily.variables(5)?.valuesArray() || []),
            },
            location: {
                latitude: response.latitude(),
                longitude: response.longitude(),
                elevation: response.elevation(),
                timezone: response.timezone(),
                timezoneAbbreviation: response.timezoneAbbreviation(),
                utcOffsetSeconds: response.utcOffsetSeconds(),
            }
        };
        return weatherData;
    }
);


const weatherInfoSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        clearWeatherData: (state) => {
            state.data = null;
            state.lastFetched = null;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeatherData.fulfilled, (state, action: PayloadAction<WeatherData>) => {
                state.loading = false;
                state.data = action.payload;
                state.lastFetched = Date.now();
                state.error = null;
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch weather data';
            });
    },
});


export const { clearWeatherData, clearError } = weatherInfoSlice.actions;

export const selectWeatherData = (state: RootState) => state.weather.data;
export const selectWeatherLoading = (state: RootState) => state.weather.loading;
export const selectWeatherError = (state: RootState) => state.weather.error;
export const selectWeatherLastFetched = (state: RootState) => state.weather.lastFetched;

// Helper function to check if the data need to be refreshed (1 hour interval)
export const shouldRefreshWeather = (state: RootState): boolean => {
    const lastFetched = selectWeatherLastFetched(state);
    if (!lastFetched) return true;
    return Date.now() - lastFetched > 60 * 60 * 1000; // 1 hour
};

export default weatherInfoSlice.reducer;
