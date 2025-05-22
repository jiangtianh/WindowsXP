import ProjectIcon from "@assets/icons/StartMenuPrograms128x128.webp";

export type ProjectId = string;
export interface ProjectFolderItem {
    id: ProjectId;
    name: string;
    type: 'file' | 'folder';
    icon: string;
    content?: React.ReactNode;      // Only files have content
    showCategories?: boolean;       // Only folders have this property
    category?: string;              // Only folders have this property
    children?: Record<ProjectId, ProjectFolderItem>;
}

export const projectsContentData: ProjectFolderItem = {
    id: 'root',
    name: 'MyProjects',
    type: 'folder',
    icon: ProjectIcon,
    showCategories: true,
    children: {
        'foodDeliveryApp': {
            id: 'foodDeliveryApp',
            name: 'DoorDash Mockup',
            type: 'file',
            category: 'Full Stack',
            icon: ProjectIcon,
            content: (
                <>
                    DASHDOOR
                </>
            )
        },
        'skierResortApp': {
            id: 'skierResortApp',
            name: 'Ski Resort Microservice',
            type: 'file',
            category: 'Microservice',
            icon: ProjectIcon,
            content: (
                <>
                    SKIRESORT
                </>
            )
        },
        'reactTicketManagementApp': {
            id: 'reactTicketManagementApp',
            name: 'Ticket Management App',
            type: 'file',
            category: 'Full Stack',
            icon: ProjectIcon,
            content: (
                <>
                    TICKETMANAGEMENT
                </>
            )
        },
    }
}