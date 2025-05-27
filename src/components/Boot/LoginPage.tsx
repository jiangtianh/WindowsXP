import { useDispatch } from "react-redux";
import { setBootPhase, BootPhase } from "../../services/bootStatusSlice";

import powerIcon from "@assets/icons/Power64x64.webp";
import xpBootLogoWhite from "@assets/xp-boot-logo-white.svg";
import userIcon from "@assets/icons/user-icon.webp";
import "./LoginPage.css";

const LoginPage: React.FC = () => {

    const dispatch = useDispatch();
    const turnOff = () => {
        dispatch(setBootPhase(BootPhase.SHUTDOWN));
    };
    const handleLogin = () => {
        dispatch(setBootPhase(BootPhase.DESKTOP));
    }

    return (
        <div className="h-svh w-screen overflow-hidden login-background">
            <div className="flex items-center justify-center h-full w-full">

                {/* Top Header */}
                <div className="absolute login-header-background w-full md:h-32 h-1/8 top-0 login-top-header-border-bottom"></div>

                {/* Middle Content */}
                <div className="w-9/10 relative">
                    <div className="flex items-center justify-center h-full w-full">
                        <div className="flex w-full">

                            <div className="md:flex hidden justify-end items-center w-1/2">
                                <div className="me-3">
                                    <div className="flex justify-end w-full">
                                        <div className="w-1/2 mb-5">
                                            <img src={xpBootLogoWhite} alt="XP Boot Logo" />
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-end">
                                        <div className="lg:mr-8 mr-0">
                                            <div className="text-white text-2xl text-right font-family-trebuchet">
                                                To begin, click your user name
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="md:flex hidden w-px h-96 mx-3 login-middle-line"></div>

                            <div className="flex items-center ms-3">
                                <div className="absolute h-28 md:w-7/12 w-screen">

                                    <div
                                        className="w-full h-full flex items-center cursor-pointer rounded-xl px-6 py-2.5 login-select-user"
                                        onClick={handleLogin}
                                    >
                                        <div className="login-user-icon me-5 rounded-lg">
                                            <img src={userIcon} alt="User Icon" className="w-full h-full rounded-lg" />
                                        </div>
                                        <div className="text-white text-2xl font-family-trebuchet">
                                            Jiangtian Han
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                {/* Bottom Header */}
                <div className="absolute login-header-background w-full md:h-36 h-1/6 bottom-0 login-bottom-header-border-top flex justify-center items-center">
                    <div className="w-9/10 flex justify-between items-center pb-3 md:pb-6">
                        <div className="flex items-center login-turn-off-button cursor-pointer" onClick={turnOff}>
                            <img src={powerIcon} alt="Shutdown Icon" className="w-8 h-8 me-2" />
                            <span className="text-white text-2xl font-family-trebuchet">Turn off computer</span>
                        </div>
                        <div className="text-white font-family-pixelated-ms-sans-serif md:w-2/6 w-3/6 text-base">
                            After loggin in, click on the projects folder to see my projects.
                        </div>
                    </div>
                </div>

            </div >
        </div >
    )
};
export default LoginPage;