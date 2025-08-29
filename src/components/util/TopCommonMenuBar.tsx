import { useState, useRef, useEffect } from "react";
import "./TopCommonMenuBar.css";

interface MenuItemWithSubmenu {
    label: string;
    submenu?: MenuItem[];
    onClick?: () => void;
    checked?: boolean;
    disabled?: boolean;
}

interface MenuItem {
    label: string;
    onClick?: () => void;
    checked?: boolean;
    disabled?: boolean;
}


interface TopCommonMenuBarProps {
    items?: (string | MenuItemWithSubmenu)[];
    showWindowsBadge?: boolean;
}

const TopCommonMenuBar: React.FC<TopCommonMenuBarProps> = (
    { items = ["File", "Edit", "View", "Tools"], showWindowsBadge = true } // Default items
) => {

    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMenuClick = (index: number, item: string | MenuItemWithSubmenu) => {
        if (typeof item === 'string') {
            // Simple string item, no dropdown
            return;
        }

        if (item.onClick && !item.submenu) {
            // Menu item with direct action, no submenu
            item.onClick();
            setActiveMenu(null);
            setIsMenuOpen(false);
        } else if (item.submenu) {
            // Menu item with submenu
            if (activeMenu === index && isMenuOpen) {
                setActiveMenu(null);
                setIsMenuOpen(false);
            } else {
                setActiveMenu(index);
                setIsMenuOpen(true);
            }
        }
    };

    const handleSubmenuClick = (menuItem: MenuItem) => {
        if (menuItem.disabled) return;

        if (menuItem.onClick) {
            menuItem.onClick();
        }

        setActiveMenu(null);
        setIsMenuOpen(false);
    };

    const handleMenuHover = (index: number) => {
        if (isMenuOpen) {
            setActiveMenu(index);
        }
    };

    const renderSubmenu = (submenu: MenuItem[]) => {
        return (
            <div
                className="absolute top-full left-0 bg-[#ece9d8] border border-gray-400 shadow-lg z-50 min-w-32 font-family-tahoma"
                style={{ marginTop: '1px' }}
            >
                {submenu.map((item, index) => {
                    if (item.label === '---') {
                        return (
                            <div key={index} className="border-t border-gray-400 my-0.5"></div>
                        );
                    }

                    return (
                        <div
                            key={index}
                            className={`
                                px-2 py-1 cursor-pointer flex items-center justify-between h-6 submenu-item ${item.disabled ? 'disabled' : ''}`}
                            onClick={() => handleSubmenuClick(item)}
                        >
                            <span>{item.label}</span>
                            {item.checked && (
                                <span className="ml-2">✓</span>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div
            ref={menuRef}
            className="flex justify-between h-6 items-center select-none font-family-tahoma flex-shrink-0 relative"
        >
            <div className="flex items-center h-full px-0.5 pt-0.5 pb-px w-full menu-bar-border-bottom menu-bar-border-right">
                {items.map((item, index) => {
                    const isString = typeof item === 'string';
                    const label = isString ? item : item.label;
                    const hasSubmenu = !isString && item.submenu && item.submenu.length > 0;
                    const isActive = activeMenu === index && isMenuOpen;

                    return (
                        <div
                            key={index}
                            className={`relative flex items-center h-full cursor-pointer px-1.5 menu-bar-buttons ${isActive ? 'active' : ''}`}
                            onClick={() => handleMenuClick(index, item)}
                            onMouseEnter={() => handleMenuHover(index)}
                        >
                            {label}

                            {hasSubmenu && isActive && renderSubmenu(item.submenu!)}
                        </div>
                    );
                })}
            </div>

            {showWindowsBadge && (
                <div className="flex items-center menu-bar-border-bottom h-full w-10 justify-center bg-gray-100">
                    <img src='/icons/XPlogo_32x32.webp' alt="Windows XP" className="h-5 object-cover" />
                </div>
            )}
        </div>
    );
};
export default TopCommonMenuBar;