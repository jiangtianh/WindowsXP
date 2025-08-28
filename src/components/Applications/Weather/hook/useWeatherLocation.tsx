import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectClientInfo, getSystemInfo } from "../../../../services/clientInfoSlice";
import type { AppDispatch } from "../../../../services/store";


export interface Location {
    lat: number;
    lon: number;
}

export const useWeatherLocation = () => {
    const dispatch = useDispatch<AppDispatch>();
    const clientInfoSlice = useSelector(selectClientInfo);

    const [location, setLocation] = useState<Location | null>(null);
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
                console.log("Browser geolocation successful");
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
        );
    }

    const tryClientInfoFallback = () => {
        console.log("Trying ClientInfo coordinates as fallback...");

        if (clientInfoSlice.coordinates) {
            const splitedLocation = clientInfoSlice.coordinates.split(" ");
            const latitude = parseFloat(splitedLocation[0]);
            const longitude = parseFloat(splitedLocation[2]);

            if (!isNaN(latitude) && !isNaN(longitude)) {
                console.log("ClientInfo coordinates found and valid");
                setLocation({ lat: latitude, lon: longitude });
                setLocationLoading(false);
            } else {
                console.log("ClientInfo coordinates invalid");
                setLocationError("Unable to get location: coordinates are invalid");
                setLocationLoading(false);
            }
        } else {
            console.log("ClientInfo coordinates not available");
            setLocationError("Unable to get location from browser or system info");
            setLocationLoading(false);
        }
    };

    const setCustomLocation = (lat: number, lon: number) => {
        setLocation({ lat, lon });
        setLocationError(null);
        setLocationAttempted(true);
    };

    const retryLocation = () => {
        setLocationError(null);
        setLocation(null);
        setLocationAttempted(false);
    };

    // Fetch system information if not already fetched
    useEffect(() => {
        if (!clientInfoSlice.fetched) {
            dispatch(getSystemInfo());
        }
    }, [clientInfoSlice.fetched, dispatch]);

    // Get location when ClientInfo is ready and we haven't attempted yet
    useEffect(() => {
        if (clientInfoSlice.fetched && !locationAttempted) {
            setLocationAttempted(true);
            getCurrentLocation();
        }
    }, [clientInfoSlice.fetched, locationAttempted]);

    return {
        location,
        locationError,
        locationLoading,
        setCustomLocation,
        retryLocation
    };
}