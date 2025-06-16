import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import axios from "axios";
import {
    osVersion,
    osName,
    browserVersion,
    browserName,
    deviceType,
    mobileModel,
    mobileVendor,
    isTablet,
    isMobile,
} from 'react-device-detect'

export interface ClientInfo {
    fetched: boolean;
    fetchedSuccess?: boolean;
    loading: boolean;

    deviceType: string;
    mobileVendor?: string;
    mobileModel?: string;
    isTablet: boolean;
    isMobile: boolean;
    osName: string;
    osVersion: string;
    browserName: string;
    browserVersion: string;
    gpu: string;
    displayRes: string;
    cpuCores: string;
    ip?: string;
    isp?: string;
    location?: string;
    coordinates?: string;
}

const initialState: ClientInfo = {
    fetched: false,
    loading: false,
    deviceType: '',
    isTablet: false,
    isMobile: false,
    osName: '',
    osVersion: '',
    browserName: '',
    browserVersion: '',
    gpu: '',
    displayRes: '',
    cpuCores: '',
}

export const clientInfoSlice = createSlice({
    name: "clientInfo",
    initialState,
    reducers: {
        updateClientInfo: (state, action: PayloadAction<ClientInfo>) => {
            return { ...state, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSystemInfo.pending, (state) => {
                return { ...state, loading: true };
            })
            .addCase(getSystemInfo.fulfilled, (state, action) => {
                return { ...state, ...action.payload, loading: false };
            })
            .addCase(getSystemInfo.rejected, (state) => {
                return { ...state, loading: false, fetched: true };
            })
    }
})

export const getSystemInfo = createAsyncThunk(
    'clientInfo/getSystemInfo',
    async () => {
        let result = { fetched: true } as ClientInfo;
        console.log('Fetching geo info...');
        try {
            const response = await axios.get('https://free.freeipapi.com/api/json');
            if (response.status === 200) {
                const res = response.data;
                result = {
                    ...result,
                    ip: res.ipAddress,
                    location: `${res.cityName}, ${res.regionName}, ${res.countryName}`,
                    isp: res.asnOrganization,
                    coordinates: `${res.latitude} N, ${res.longitude} W`,
                    fetchedSuccess: true,
                }
            }
        } catch (error) {
            console.error('Error fetching geo info:', error);
        }

        console.log('Getting system info...');
        const gl = document.createElement('canvas').getContext('webgl');
        const ext = gl?.getExtension('WEBGL_debug_renderer_info');
        if (ext) {
            const gpu = gl?.getParameter(ext.UNMASKED_RENDERER_WEBGL);
            result = { ...result, gpu };
        }
        const screenWidth = window.screen.width
        const screenHeight = window.screen.height
        result = {
            ...result,
            cpuCores: navigator.hardwareConcurrency.toString(),
            displayRes: `${screenWidth} x ${screenHeight}`,
            deviceType,
            mobileVendor: isMobile ? mobileVendor : undefined,
            mobileModel: isMobile ? mobileModel : undefined,
            isTablet,
            isMobile,
            osName,
            osVersion,
            browserName,
            browserVersion,
        }
        return result;
    }
)



export const { updateClientInfo } = clientInfoSlice.actions;
export const selectClientInfo = (state: RootState) => state.clientInfo;

export default clientInfoSlice.reducer;