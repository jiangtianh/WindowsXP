import { useState, useRef, useEffect } from "react";
import './FolderButton.css';

interface FolderButtonProps {
    name: string;
    icon: string;
    description?: string;
    fileSize?: string;
    onDoubleClick: () => void;
};

const FolderButton: React.FC<FolderButtonProps> = ({ name, icon, description, fileSize, onDoubleClick }) => {
    const [isSelected, setIsSelected] = useState(false);
    const nodeRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSelected(true);
    };
    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSelected(false);
        onDoubleClick();
    };

    useEffect(() => {
        const handleClickOutside = () => {
            if (isSelected) setIsSelected(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSelected]);

    return (
        <div
            ref={nodeRef}
            className={`folder-button flex items-center w-52 px-3 py-2 cursor-pointer gap-2.5 ${isSelected ? 'folder-button-active' : ''}`}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
        >
            <img
                src={icon}
                alt={name}
                className="w-10 h-10 flex-shrink-0"
            />
            <div className="flex flex-col items-start">
                <div className="text-xs px-1 folder-button-text-container">
                    <div className="folder-button-main-text line-clamp-2 max-w-fit">{name}</div>
                    {description && (
                        <div className="folder-button-minor-text">
                            {description}
                        </div>
                    )}
                    {fileSize && (
                        <div className="folder-button-minor-text">
                            {fileSize}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default FolderButton;