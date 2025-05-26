import { useState } from "react";

import type { WindowKey } from "../../../services/types";
import TopCommonMenuBar from "../../util/TopCommonMenuBar";
import WindowTopNavigation from "../../util/WindowTopNavigation";
import WindowSideMenu from "../../util/WindowSideMenu";

import { projectsContentData, renderProjectConetent } from "./ProjectsContentData";
import "./ProjectContent.css";

interface ProjectsContentProps {
    windowKey: WindowKey;
}

const ProjectsContent: React.FC<ProjectsContentProps> = ({ windowKey }) => {

    const [pathNames, setPathNames] = useState<string[]>([projectsContentData.name]);
    const [pathIds, setPathIds] = useState<string[]>([projectsContentData.id]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const navigateTo = (id: string, name: string) => {
        // When navigating to a new folder, clear everything after the current index
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

    const getCurrentProjectItem = () => {
        let currentItem = projectsContentData;
        for (let i = 1; i <= currentIndex; i++) {
            if (currentItem.children && currentItem.children[pathIds[i]]) {
                currentItem = currentItem.children[pathIds[i]];
            } else {
                console.error(`Invalid path: ${pathIds[i]} not found in children of ${currentItem.id}`);
                return null; // Invalid path
            }
        }
        return currentItem;
    };

    const groupItemsByCategory = (items: Record<string, any>) => {
        const grouped: Record<string, any[]> = { uncategorized: [] };

        Object.entries(items).forEach(([id, item]) => {
            if (item.category) {
                if (!grouped[item.category]) {
                    grouped[item.category] = [];
                }
                grouped[item.category].push({ id, ...item });
            } else {
                grouped.uncategorized.push({ id, ...item });
            }
        });

        return grouped;
    };


    const renderContent = () => {
        const current = getCurrentProjectItem();

        if (!current) return <h1>Invalid path</h1>;

        if (current.type === 'file') {
            if (!current.content) return <h1>File have no content</h1>;
            return renderProjectConetent(current.content);
        } else if (current.type === 'folder') {
            if (!current.children) return <h1>Folder have no children</h1>;

            if (current.showCategories) {
                const grouped = groupItemsByCategory(current.children);
                return (
                    <div className="pt-1">
                        {/* Render categories */}
                        {Object.entries(grouped)
                            .filter(([category]) => category !== 'uncategorized')
                            .map(([category, items]) => (
                                <div key={category} className="relative mb-3 select-none">
                                    <span className="text-xs font-bold px-3">{category}</span>
                                    <div className="w-80 h-px my-1 folder-category-divider"></div>
                                    <div className="flex flex-wrap gap-2 pb-3 w-full px-3">
                                        {items.map(item => (
                                            <div
                                                key={item.id}
                                                className="flex items-center w-52 px-3 py-2 cursor-pointer gap-2.5"
                                                onDoubleClick={() => navigateTo(item.id, item.name)}
                                            >
                                                <img
                                                    src={item.icon}
                                                    alt={item.name}
                                                    className="w-10 h-10 flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <span className="text-xs line-clamp-2 overflow-hidden">{item.name}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        }

                        {/* Render uncategorized items first */}
                        {grouped.uncategorized.length > 0 && (
                            <div className="relative mb-3 select-none">
                                <span className="text-xs font-bold px-3">Other</span>
                                <div className="w-80 h-px my-1 folder-category-divider"></div>
                                <div className="flex flex-wrap gap-2 pb-3 w-full px-3">
                                    {grouped.uncategorized.map(item => (
                                        <div
                                            key={item.id}
                                            className="flex items-center w-52 px-3 py-2 cursor-pointer gap-2.5"
                                            onDoubleClick={() => navigateTo(item.id, item.name)}
                                        >
                                            <img
                                                src={item.icon}
                                                alt={item.name}
                                                className="w-10 h-10 flex-shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <span className="text-xs line-clamp-2 overflow-hidden">{item.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            } else {
                return (
                    <div>
                        <div className="relative mb-3 select-none">
                            <div className="flex flex-wrap gap-2 pb-3 w-full px-3">
                                {Object.entries(current.children).map(([id, item]) => (
                                    <div
                                        key={id}
                                        className="flex items-center w-52 px-3 py-2 cursor-pointer gap-2.5"
                                        onDoubleClick={() => navigateTo(id, item.name)}
                                    >
                                        <img
                                            src={item.icon}
                                            alt={item.name}
                                            className="w-10 h-10 flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs line-clamp-2 overflow-hidden">{item.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            }
        }
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
                    <WindowSideMenu items={['SystemTasks', 'Other', 'Details']} />
                </div>

                {/* PlaceHolder  */}
                <div className="flex-1 overflow-auto h-full bg-white flex-col w-full font-family-tahoma">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};
export default ProjectsContent;