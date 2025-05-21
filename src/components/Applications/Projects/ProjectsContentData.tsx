import ProjectIcon from "@assets/icons/StartMenuPrograms128x128.webp";

export type ProjectId = string;
export interface ProjectItem {
    id: ProjectId;
    name: string;
    type: 'file' | 'folder';
    icon: string;
    content?: React.ReactNode;
    children?: ProjectId[];
}

export const projectsContentData: Record<ProjectId, ProjectItem> = {
    'root': {
        id: 'root',
        name: 'My Projects',
        type: 'folder',
        icon: ProjectIcon,
        children: []
    },
}