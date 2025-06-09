import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../services/store";
import type { WindowKey } from "../../services/types";


import "./WindowTopNavigation.css";
const BackIcon = "/icons/Back64x64.webp";
const ForwardIcon = "/icons/Forward64x64.webp";
const FolderUpIcon = "/icons/Up64x64.webp";
const SearchIcon = "/icons/Search64x64.webp";
const FolderViewIcon = "/icons/FolderView64x64.webp";
const IconViewIcon = "/icons/IconView64x64.webp";
const GoIcon = "/icons/Go32x32.webp";
const DropdownArrowIcon = "/icons/DropdownArrow.webp";


interface WindowTopNavigationProp {
    windowKey: WindowKey;
    backActive?: boolean;
    onBackClick?: () => void;
    forwardActive?: boolean;
    onForwardClick?: () => void;
    upActive?: boolean;
    onUpClick?: () => void;
    pathNames?: string[];
    currentIndex?: number;
}

const WindowTopNavigation: React.FC<WindowTopNavigationProp> = ({
    windowKey,
    backActive = false,
    onBackClick,
    forwardActive = false,
    onForwardClick,
    upActive = false,
    onUpClick,
    pathNames = [],
    currentIndex = 0,
}) => {

    const currentWindow = useSelector((state: RootState) => state.windows.windows[windowKey]);

    const [displayPath, setDisplayPath] = useState(currentWindow.title);

    useEffect(() => {
        if (pathNames && pathNames.length > 0) {
            const currentPath = pathNames.slice(0, currentIndex + 1).join("/");
            setDisplayPath(currentPath);
        } else {
            setDisplayPath(currentWindow.title);
        }
    }, [pathNames, currentIndex, currentWindow.title]);


    const handleBackClick = () => {
        if (backActive && onBackClick) {
            onBackClick();
        }
    };

    const handleForwardClick = () => {
        if (forwardActive && onForwardClick) {
            onForwardClick();
        }
    };

    const handleUpclick = () => {
        if (upActive && onUpClick) {
            onUpClick();
        }
    };

    return (
        <div className="font-family-tahoma flex-shrink-0 select-none">
            <div className="flex relative top-0 w-full h-9 window-top-navigation-bar overflow-hidden pl-1">
                <div className="flex items-center justify-center min-w-max h-full">

                    <div
                        className={`flex items-center gap-1 h-8 px-1 top-buttons rounded-xs mx-px ${backActive ? 'cursor-pointer' : 'disabled'}`}
                        onClick={handleBackClick}
                    >
                        <img src={BackIcon} alt="Back" className="w-5 h-5 flex-shrink-0" />
                        <span className="mr-2">Back</span>
                        <div className="block border-solid down-arrow"></div>
                    </div>

                    <div
                        className={`flex items-center gap-1 h-8 px-1 top-buttons rounded-xs mx-px ${forwardActive ? 'cursor-pointer' : 'disabled'}`}
                        onClick={handleForwardClick}
                    >
                        <img src={ForwardIcon} alt="Forward" className="w-5 h-5 flex-shrink-0" />
                        <div className="block border-solid down-arrow"></div>
                    </div>

                    <div
                        className="flex items-center gap-1 h-8 px-1 top-buttons rounded-xs mx-px cursor-pointer"
                        onClick={handleUpclick}
                    >
                        <img src={FolderUpIcon} alt="Up" className="w-5 h-5 flex-shrink-0" />
                    </div>
                </div>
                <div className="flex items-center h-full min-w-max">
                    <div className="h-7/8 w-px bg-[#C0C0C0]"></div>
                </div>
                <div className="flex items-center justify-center min-w-max h-full">
                    <div className="flex items-center gap-1 h-8 px-1 top-buttons rounded-xs mx-px cursor-pointer">
                        <img src={SearchIcon} alt="Search" className="w-5 h-5 flex-shrink-0" />
                        <span>Search</span>
                    </div>
                    <div className="flex items-center gap-1 h-8 px-1 top-buttons rounded-xs mx-px cursor-pointer">
                        <img src={FolderViewIcon} alt="Search" className="w-5 h-5 flex-shrink-0" />
                        <span>Folders</span>
                    </div>
                </div>
                <div className="flex items-center h-full min-w-max">
                    <div className="h-7/8 w-px bg-[#C0C0C0]"></div>
                </div>
                <div className="flex items-center justify-center min-w-max h-full">
                    <div className="flex items-center gap-1 h-8 px-1 top-buttons rounded-xs mx-px cursor-pointer">
                        <img src={IconViewIcon} alt="Search" className="w-5 h-5 flex-shrink-0" />
                        <div className="block border-solid down-arrow"></div>
                    </div>
                </div>
            </div>
            <div className="flex items-center w-full h-5 px-0.5 window-top-navigation-bar">
                <div>
                    <span className="px-1.5 text-gray-500">Address</span>
                </div>
                <div className="w-full h-full bg-white border border-blue-400 pl-1 pr-px flex items-center justify-between overflow-hidden">
                    <div className="flex items-center">
                        <img src={currentWindow.icon} alt={currentWindow.title} className="w-3.5 h-3.5" />
                        <span className="px-1 truncate mt-px">
                            {displayPath}
                        </span>
                    </div>
                    <div className="hover:brightness-110 cursor-pointer flex-shrink-0">
                        <img src={DropdownArrowIcon} alt="Dropdown" className="w-3.5 h-3.5" />
                    </div>

                </div>
                <div className="flex items-center px-2 gap-1 w-16">
                    <img src={GoIcon} alt="Go" className="w-4 h-4 flex-shrink-0 cursor-pointer hover:brightness-110" />
                    <span className="">Go</span>
                </div>
            </div>
        </div>
    )
};
export default WindowTopNavigation;