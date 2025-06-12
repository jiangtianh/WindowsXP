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
                            name="Credit"
                            icon={TxtIcon}
                            onDoubleClick={() => navigateTo('credit', 'Credit')}
                        />
                    </div>
                </div>
            </div>
        ),
        'about': (
            <>ABOUT</>
        ),
        'credit': (
            <>CREDIT</>
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