import type { WindowKey, DesktopIconInfo } from "../types"
import NotepadIcon from "@/assets/icons/Notepad128x128.webp";
import ProjectIcon from "@/assets/icons/StartMenuPrograms128x128.webp";
import CVIcon from "@/assets/icons/FaxSenderInformation128x128.webp";
import MinesweeperIcon from "@assets/icons/Minesweeper128x128.webp";
import PinballIcon from "@assets/icons/Pinball128x128.webp";
import GameControllerIcon from "@assets/icons/GameController128x128.webp";
import ReiIcon from "@/assets/icons/Rei128x128.webp";
import SolitaireIncon from "@assets/icons/Solitaire128x128.webp";
import SystemPropertiesIcon from "@assets/icons/SystemProperties128x128.webp";

export const initialDesktopIconState: Record<WindowKey, DesktopIconInfo> = {
    'Projects': {
        title: 'My Projects',
        icon: ProjectIcon,
        coordinates: { gridX: 0, gridY: 1 },
    },
    'Notepad': {
        title: 'Notepad',
        icon: NotepadIcon,
        coordinates: { gridX: 0, gridY: 3 },
    },
    'CV': {
        title: 'My CV',
        icon: CVIcon,
        coordinates: { gridX: 0, gridY: 2 },
    },
    "Minesweeper": {
        title: 'Minesweeper',
        icon: MinesweeperIcon,
        coordinates: { gridX: 0, gridY: 4 },
    },
    'jsdos': {
        title: 'Jsdos',
        icon: GameControllerIcon,
        coordinates: { gridX: 1, gridY: 0 },
    },
    'Pinball': {
        title: 'Pinball',
        icon: PinballIcon,
        coordinates: { gridX: 1, gridY: 1 },
    },
    'VirtualRei': {
        title: 'Rei Ayanami',
        icon: ReiIcon,
        coordinates: { gridX: 0, gridY: 5 },
    },
    'Solitaire': {
        title: 'Solitaire',
        icon: SolitaireIncon,
        coordinates: { gridX: 1, gridY: 2 },
    },
    'SystemProperties': {
        title: 'System Properties',
        icon: SystemPropertiesIcon,
        coordinates: { gridX: 0, gridY: 0 },
    }
}
