import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../services/store";
import { BootPhase, setBootPhase } from "../../services/bootStatusSlice";

import xpBootLogoWhite from "@/assets/xp-boot-logo-white.svg";

import BootLoadingBar from "./BootLoadingBar";



const BootLoading: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setBootPhase(BootPhase.LOGIN));
        }, 5000);

        return () => clearTimeout(timer);
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-black">
            <div>
                <img src={xpBootLogoWhite} alt="Windows XP Boot Logo" className="w-100 mx-auto" />
            </div>
            <div className="flex items-center justify-center w-full">
                <div className="my-7 px-8 mx-auto">
                    <BootLoadingBar />
                </div>
            </div>

            <div className="absolute bottom-0 w-full p-6 md:p-12">
                <div className="flex justify-between items-center text-white">
                    <div className="text-sm md:text-xl font-family-pixelated-ms-sans-serif">
                        Copyright © 2025 Jiangtian Han
                    </div>
                    <div className="text-lg md:text-2xl font-family-helvetica-black-italic font-semibold">
                        jiangtianh
                    </div>
                </div>
            </div>

        </div>
    )
};
export default BootLoading;