import type { WindowKey, DesktopIconInfo } from "../types"
import NotepadIcon from "@/assets/icons/Notepad128x128.webp";
import ProjectIcon from "@/assets/icons/StartMenuPrograms128x128.webp";
import CVIcon from "@/assets/icons/FaxSenderInformation128x128.webp";


export const initialDesktopIconState: Record<WindowKey, DesktopIconInfo> = {
    'Projects': {
        title: 'My Projects',
        icon: ProjectIcon,
        coordinates: { gridX: 0, gridY: 0 },
    },
    'Notepad': {
        title: 'Notepad',
        icon: NotepadIcon,
        coordinates: { gridX: 0, gridY: 2 },
    },
    'CV': {
        title: 'My CV',
        icon: CVIcon,
        coordinates: { gridX: 0, gridY: 1 },
    }
}
