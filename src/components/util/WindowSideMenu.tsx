import { useState } from "react";
import "./WindowSideMenu.css";

const PropertiesIcon = "/icons/Properties32x32.webp";
const ProgramsIcon = "/icons/Programs32x32.webp";
const ControlPanelIcon = "/icons/ControlPanel32x32.webp";
const MyNetworkPlacesIcon = "/icons/MyNetworkPlaces32x32.webp";
const MyDocumentsIcon = "/icons/MyDocuments32x32.webp";
const FolderClosedIcon = "/icons/FolderClosed32x32.webp";
const GithubIcon = "/icons/Github32x32.webp";
const MyComputerIcon = "/icons/MyComputer32x32.webp";
const NewFolderIcon = "/icons/NewFolder32x32.webp";
const PublishToWebIcon = "/icons/PublishToWeb32x32.webp";
const SharedFolderIcon = "/icons/SharedFolder32x32.webp";

interface MenuItem {
    icon: string;
    label: string;
    onClick?: () => void;
};
interface SectionData {
    title: string;
    items: MenuItem[];
};

type ItemType = 'SystemTasks' | 'Other' | 'Details' | 'FileAndFolderTasks' | 'OtherPlaces';
interface WindowSideMenuProps {
    items?: ItemType[];
}


const WindowSideMenu: React.FC<WindowSideMenuProps> = ({ items }) => {
    const [collapsedSections, setCollapsedSections] = useState<Record<ItemType, boolean>>({
        SystemTasks: false,
        Other: false,
        Details: false,
        FileAndFolderTasks: false,
        OtherPlaces: false
    });

    const toggleSection = (section: ItemType) => {
        setCollapsedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const sectionData: Record<ItemType, SectionData> = {
        SystemTasks: {
            title: "System Tasks",
            items: [
                { icon: PropertiesIcon, label: "View system information" },
                { icon: ProgramsIcon, label: "Add or remove programs" },
                { icon: ControlPanelIcon, label: "Change a setting" }
            ]
        },
        Other: {
            title: "Other",
            items: [
                { icon: MyNetworkPlacesIcon, label: "My Network Places" },
                { icon: MyDocumentsIcon, label: "My Docments" },
                { icon: FolderClosedIcon, label: "Shared Documents" },
                { icon: ControlPanelIcon, label: "Control Panel" }
            ]
        },
        Details: {
            title: "Details",
            items: [
                { icon: GithubIcon, label: "My Github", onClick: () => { window.open('https://github.com/jiangtianh', '_blank') } },
            ]
        },
        OtherPlaces: {
            title: "Other Places",
            items: [
                { icon: FolderClosedIcon, label: "Documents and Settings" },
                { icon: MyDocumentsIcon, label: "My Documents" },
                { icon: FolderClosedIcon, label: "Shared Documents" },
                { icon: MyComputerIcon, label: "My Computer" },
                { icon: MyNetworkPlacesIcon, label: "My Network Places" },
            ]
        },
        FileAndFolderTasks: {
            title: "File and Folder Tasks",
            items: [
                { icon: NewFolderIcon, label: "Make a new folder" },
                { icon: PublishToWebIcon, label: "Publish this folder to the web" },
                { icon: SharedFolderIcon, label: "Share this folder" },
            ]
        }
    }

    return (
        <div className="flex flex-col flex-shrink-0 gap-3 window-side-menu w-32 md:w-48 h-full overflow-hidden p-2.5 select-none font-family-tahoma">
            {items?.map((item, index) => {
                const section = sectionData[item];
                const isCollapsed = collapsedSections[item];
                return (
                    <div key={index} className="window-side-menu-section rounded-t-sm">
                        <div
                            className="window-side-menu-section-header flex flex-row justify-between items-center rounded-t-sm pe-1 pl-2 py-1 cursor-pointer"
                            onClick={() => toggleSection(item)}
                        >
                            <span>{section.title}</span>
                            <span className={`arrow-icon ${isCollapsed ? 'collapsed' : ''}`}></span>
                        </div>

                        {!isCollapsed && (
                            <div className="overflow-hidden">
                                {section.items.map((menuItem, idx) => (
                                    <div key={idx} className="px-1 py-0.5 md:py-0.75 md:px-2">
                                        <div
                                            className="flex flex-row items-center gap-1 cursor-pointer hover:underline hover:text-[#1C68FF]"
                                            onClick={menuItem.onClick ? menuItem.onClick : undefined}
                                        >
                                            <img
                                                src={menuItem.icon}
                                                alt={menuItem.label}
                                                className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5"
                                            />
                                            <span className="text-[.45rem] md:text-[.65rem]">{menuItem.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                );
            })}
        </div >
    );
};
export default WindowSideMenu;