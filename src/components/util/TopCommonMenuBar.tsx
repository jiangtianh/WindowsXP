import windowsHeaderWindowIcon from "@assets/icons/XPlogo_32x32.webp";

import "./TopCommonMenuBar.css";

interface TopCommonMenuBarProps {
    items?: string[];
    showWindowsBadge?: boolean;
}

const TopCommonMenuBar: React.FC<TopCommonMenuBarProps> = (
    { items = ["File", "Edit", "View", "Tools"], showWindowsBadge = true } // Default items
) => {

    return (
        <div className="flex justify-between h-6 items-center select-none">
            <div className="flex items-center h-full px-0.5 pt-0.5 pb-px w-full menu-bar-border-bottom menu-bar-border-right">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center h-full cursor-pointer px-1.5 menu-bar-buttons">
                        {item}
                    </div>
                ))}
            </div>

            {showWindowsBadge && (
                <div className="flex items-center menu-bar-border-bottom h-full w-10 justify-center bg-gray-100">
                    <img src={windowsHeaderWindowIcon} alt="Windows XP" className="h-5 object-cover" />
                </div>
            )}

        </div>
    );
};
export default TopCommonMenuBar;