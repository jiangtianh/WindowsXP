import type { WindowKey } from "../../../services/types";
import TopCommonMenuBar from "../../util/TopCommonMenuBar";
import WindowTopNavigation from "../../util/WindowTopNavigation";
import WindowSideMenu from "../../util/WindowSideMenu";
import { useState } from "react";
import FolderButton from "../../util/FolderButton";

const TxtIcon = '/icons/TXT128x128.webp';

interface MyDocumentsProps {
    windowKey: WindowKey;
};



const MyDocumentsContent: React.FC<MyDocumentsProps> = ({ windowKey }) => {
    const [pathNames, setPathNames] = useState<string[]>(['My Documents']);
    const [pathIds, setPathIds] = useState<string[]>(['root']);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const navigateTo = (id: string, name: string) => {
        const newPathIds = [...pathIds.slice(0, currentIndex + 1), id];
        const newPathNames = [...pathNames.slice(0, currentIndex + 1), name];
        setPathIds(newPathIds);
        setPathNames(newPathNames);
        setCurrentIndex(currentIndex + 1);
    };

    const handleBackClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };
    const handleForwardClick = () => {
        if (currentIndex < pathIds.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleUpclick = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            const newPathIds = pathIds.slice(0, newIndex + 1);
            const newPathNames = pathNames.slice(0, newIndex + 1);
            setPathIds(newPathIds);
            setPathNames(newPathNames);
            setCurrentIndex(newIndex);
        }
    };

    const DocumentsContent = {
        'root': (
            <div>
                <div className="relative mb-3 select-none">
                    <div className="flex flex-wrap gap-2 pb-3 w-full px-3">
                        <FolderButton
                            name="About"
                            icon={TxtIcon}
                            description="Text Document"
                            fileSize="3 KB"
                            onDoubleClick={() => navigateTo('about', 'About')}
                        />
                        <FolderButton
                            name="Built With"
                            icon={TxtIcon}
                            onDoubleClick={() => navigateTo('builtWith', 'Built With')}
                            description="Text Document"
                            fileSize="2 KB"
                        />
                    </div>
                </div>
            </div>
        ),
        'about': (
            <div className="p-2">
                <div className="text-base font-bold">About this project</div>
                <hr className="my-2" />
                <div className="flex flex-col gap-1.5 text-xs my-2">
                    <p>This site is a tribute to my earliest memories of using a computer.</p>
                    <p>The idea was to recreate the Windows XP interface using modern web technologies, offering visitors a different—and hopefully fun—way to explore my personal site.</p>
                    <p>It's an ongoing project that I started in May 2025, designed to be as faithful to the original XP experience as possible.</p>
                    <p>Built with React, Redux, and Tailwind CSS, it combines nostalgia with technical creativity.</p>
                    <p>It's been made with a lot of love and patience—I hope you enjoy browsing through it. Thanks for stopping by!</p>
                </div>
            </div>
        ),
        'builtWith': (
            <div className="p-2">
                <div className="text-base font-bold">System Info</div>
                <hr className="my-2" />
                <div className="flex flex-col gap-1.5 text-xs my-2">
                    <p><span className="font-semibold">Frameworks & Libraries:</span> React, Redux, Tailwind CSS, <code>react-rnd</code> (for draggable/resizable windows), and <code>xp.css</code> for authentic XP styling.</p>
                    <p><span className="font-semibold">Games: </span><code>JS-DOS</code>, and the Pinball game is adapted from <a href="https://alula.github.io/3d-pinball-space-cadet/" target="_blank" rel="noopener noreferrer" className="underline">alula.github.io</a>.</p>
                    <p><span className="font-semibold">Other Tools:</span> <code>emailjs</code> for email functionality.</p>
                    <p><span className="font-semibold">Assets:</span> Icons and media are sourced from the Internet Archive and March Mountain.</p>
                </div>
            </div>
        )
    };

    const renderContent = () => {
        const currentId = pathIds[currentIndex];
        if (currentId in DocumentsContent) {
            return DocumentsContent[currentId as keyof typeof DocumentsContent];
        }
        return <div>NO CONTENT</div>
    };

    return (
        <div className="flex flex-col h-full w-full overflow-auto">
            <TopCommonMenuBar items={['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help']} />

            <WindowTopNavigation
                windowKey={windowKey}
                backActive={currentIndex > 0}
                onBackClick={handleBackClick}
                forwardActive={currentIndex < pathIds.length - 1}
                onForwardClick={handleForwardClick}
                upActive={currentIndex > 0}
                onUpClick={handleUpclick}
                pathNames={pathNames}
                currentIndex={currentIndex}
            />

            <div className="w-full h-full flex relative flex-1 min-h-0">
                <div className="h-full flex-shrink-0">
                    <WindowSideMenu items={['FileAndFolderTasks', 'OtherPlaces', 'Details']} />
                </div>

                <div className="flex-1 overflow-auto h-full bg-white flex-col w-full font-family-tahoma">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};
export default MyDocumentsContent;