import TopCommonMenuBar from "../../util/TopCommonMenuBar";
import WindowTopNavigation from "../../util/WindowTopNavigation";
import WindowSideMenu from "../../util/WindowSideMenu";
import type { WindowKey } from "../../../services/types";
import { useState } from "react";

import './MyPicturesContent.css';

interface MyPicturesProps {
    windowKey: WindowKey;
};

interface ImageItem {
    src: string;
    name: string;
};

const MyPicturesContent: React.FC<MyPicturesProps> = ({ windowKey }) => {

    const images: ImageItem[] = [
        { src: '/myPictures/1F0546CE-69F9-4B77-B982-EB36C4B0234C.webp', name: '1F0546CE-69F9-4B77-B982-EB36C4B0234C.JPEG' },
        { src: '/myPictures/15CC4939-D255-422F-B0C7-93395DFD32BA.webp', name: '15CC4939-D255-422F-B0C7-93395DFD32BA.JPEG' },
        { src: "/myPictures/Screenshot_2025-06-15_at_1.56.16_PM.webp", name: "Screenshot 2025-06-15 at 1.56.16 PM.png" },
        { src: "/myPictures/IMG_0464.webp", name: "IMG_0464.png" },
        { src: "/myPictures/IMG_0575.webp", name: "IMG_0575.JPG" },
        { src: "/myPictures/82804dbc57e280847be2db6c4339906b.webp", name: "82804dbc57e280847be2db6c4339906b.png" },
    ];

    const [imageIndex, setImageIndex] = useState<number>(0);
    const [rotationDegree, setRotationDegree] = useState<number>(0);

    const handlePreviewClick = (index: number) => {
        setImageIndex(index);
        setRotationDegree(0);
    };
    const handleRotateRightClick = () => {
        setRotationDegree((prevDegree) => (prevDegree + 90) % 360);
    };
    const handleRotateLeftClick = () => {
        setRotationDegree((prevDegree) => (prevDegree - 90 + 360) % 360);
    };
    const handlePrevImageClick = () => {
        setImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        setRotationDegree(0);
    };
    const handleNextImageClick = () => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setRotationDegree(0);
    };

    return (
        <div className="flex flex-col h-full w-full overflow-auto">
            <TopCommonMenuBar items={['File', 'Edit', 'Favorites', 'Tools', 'Help']} />
            <WindowTopNavigation windowKey={windowKey} />

            <div className="w-full h-full flex relative flex-1 min-h-0">
                <div className="h-full flex-shrink-0">
                    <WindowSideMenu items={['PictureTasks', 'FileAndFolderTasks', 'MyPictureOtherPlaces', 'Details']} />
                </div>

                <div className="flex-1 overflow-auto h-full flex-col w-full font-family-tahoma">

                    {/* Top Image Display Area */}
                    <div className="flex flex-col justify-center items-center w-full h-9/12 gap-1 bg-[#eef2fb]">
                        <div className="w-3/4 h-5/6 mt-1 border border-black overflow-hidden">
                            <div
                                className="w-full h-full bg-contain bg-no-repeat bg-center"
                                style={{
                                    backgroundImage: `url(${images[imageIndex].src})`,
                                    transform: `rotate(${rotationDegree}deg)`,
                                }}
                            />
                        </div>

                        {/* Control area */}
                        <div className="flex py-2">
                            <div className="flex gap-0.5">
                                <div
                                    className="flex items-center justify-center cursor-pointer rounded-sm border border-[#eef2fb] hover:border hover:border-gray-300 hover:shadow-header-tools p-1"
                                    onClick={handlePrevImageClick}
                                >
                                    <img src="/icons/previous-icon.svg" alt="Previous" className="w-4.5 h-4.5" />
                                </div>
                                <div
                                    className="flex items-center justify-center cursor-pointer rounded-sm border border-[#eef2fb] hover:border hover:border-gray-300 hover:shadow-header-tools p-1"
                                    onClick={handleNextImageClick}
                                >
                                    <img src="/icons/next-icon.svg" alt="Next" className="w-4.5 h-4.5" />
                                </div>
                            </div>
                            <hr className="w-px mx-2 h-full bg-[#d1cfbe] border-0" />
                            <div className="flex gap-0.5">
                                <div
                                    className="flex items-center justify-center cursor-pointer rounded-sm border border-[#eef2fb] hover:border hover:border-gray-300 hover:shadow-header-tools p-1"
                                    onClick={handleRotateLeftClick}
                                >
                                    <img src="/icons/left.svg" alt="Rotate Left" className="w-4.5 h-4.5" />
                                </div>
                                <div
                                    className="flex items-center justify-center cursor-pointer rounded-sm border border-[#eef2fb] hover:border hover:border-gray-300 hover:shadow-header-tools p-1"
                                    onClick={handleRotateRightClick}
                                >
                                    <img src="/icons/right.svg" alt="Rotate Right" className="w-4.5 h-4.5" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Preview area */}
                    <div className="w-full h-3/12 bg-white flex px-2 pt-1.5 pb-5 gap-4 overflow-x-auto xp-scrollbar-fix">

                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`w-32 h-full flex flex-col items-center cursor-pointer`}
                                onClick={() => handlePreviewClick(index)}
                            >
                                <div
                                    className={`w-full h-full min-w-20 bg-no-repeat bg-contain bg-center border  ${imageIndex === index ? 'border-3 border-[#0b61ff]' : 'border-gray-300'}`}
                                    style={{ backgroundImage: `url(${image.src})` }}
                                />
                                <p
                                    className={`text-center mt-1 font-family-pixelated-ms-sans-serif text-[0.65rem] truncate w-full max-w-[8rem] overflow-hidden whitespace-nowrap ${imageIndex === index ? 'text-white bg-[#0b61ff]' : ''}`}
                                >
                                    {image.name}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>

    );
};
export default MyPicturesContent;