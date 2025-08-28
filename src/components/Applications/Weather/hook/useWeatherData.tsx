import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchWeatherData,
    selectWeatherData,
    selectWeatherLoading,
    selectWeatherError,
    shouldRefreshWeather
} from '../../../../services/weatherInfoSlice';
import type { AppDispatch } from '../../../../services/store';
import type { Location } from './useWeatherLocation';

export const useWeatherData = (location: Location | null) => {
    const dispatch = useDispatch<AppDispatch>();

    const weatherData = useSelector(selectWeatherData);
    const weatherLoading = useSelector(selectWeatherLoading);
    const weatherError = useSelector(selectWeatherError);
    const needsRefresh = useSelector(shouldRefreshWeather);


    const fetchWeather = (customLocation?: Location) => {
        const targetLocation = customLocation || location;
        if (targetLocation) {
            console.log("Fetching weather data...");
            dispatch(fetchWeatherData({
                latitude: targetLocation.lat,
                longitude: targetLocation.lon
            }));
        }
    };

    const refreshWeather = () => {
        if (location && !weatherLoading) {
            fetchWeather();
        }
    };

    // Initial fetch when location is available
    useEffect(() => {
        if (location && (!weatherData || needsRefresh)) {
            fetchWeather();
        }
    }, [location, weatherData, needsRefresh]);

    // Auto-refresh interval
    useEffect(() => {
        if (!location || !weatherData) return;

        const checkRefresh = () => {
            const store = require('../../../../services/store').store;
            const currentState = store.getState();
            const shouldRefresh = shouldRefreshWeather(currentState);

            if (shouldRefresh) {
                console.log('Auto-refreshing weather data...');
                fetchWeather();
            }
        };

        const interval = setInterval(checkRefresh, 5 * 60 * 1000); // checks every 5 minutes
        return () => clearInterval(interval);
    }, [location, weatherData]);

    return {
        weatherData,
        weatherLoading,
        weatherError,
        refreshWeather,
        fetchWeather
    };
};