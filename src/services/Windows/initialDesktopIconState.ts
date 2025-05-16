import type { WindowKey, DesktopIconInfo } from "../types"
import NotepadIcon from "@/assets/icons/Notepad128x128.webp";


export const initialDesktopIconState: Record<WindowKey, DesktopIconInfo> = {
    'Projects': {
        title: 'My Projects',
        icon: NotepadIcon,
        coordinates: { gridX: 0, gridY: 0 },
    },
    'Notepad': {
        title: 'Notepad',
        icon: NotepadIcon,
        coordinates: { gridX: 1, gridY: 0 },
    }
}
