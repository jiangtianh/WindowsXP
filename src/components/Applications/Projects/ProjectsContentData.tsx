const ProjectIcon = "/icons/StartMenuPrograms128x128.webp";
const DashdoorIcon = "/icons/dashdoor.webp";

import type { IconName } from "./ProjectTechStackIconMap";
import { TechIcon } from "./ProjectTechStackIconMap";


type ProjectId = string;

interface ProjectContent {
    title?: string;
    dateTime?: string;
    techStack?: IconName[];
    content?: React.ReactNode;
    repositoryLink?: string;
}

interface ProjectFolderItem {
    id: ProjectId;
    name: string;
    type: 'file' | 'folder';
    icon: string;
    content?: ProjectContent;      // Only files have content
    showCategories?: boolean;       // Only folders have this property
    category?: string;              // Only folders have this property
    children?: Record<ProjectId, ProjectFolderItem>;
}


export const renderProjectConetent = (content: ProjectContent) => {
    return (
        <div className="py-2 px-2 project-content">
            {content.title && content.dateTime && (
                <div className="w-full gap-4 mb-3">
                    <div className="font-bold text-base mb-1">{content.title}</div>
                    <div className="font-bold text-sm">{content.dateTime}</div>
                </div>
            )}
            {content.techStack && (
                <div className="flex w-full items-center justify-start flex-wrap gap-4 text-xs mb-4">
                    {content.techStack.map((tech, index) => (
                        <div key={index} className="flex flex-col items-center flex-wrap">
                            <TechIcon name={tech} size={28} />
                            <span className="font-bold">{tech}</span>
                        </div>
                    ))}
                </div>
            )}
            {content.content && (<>{content.content}</>)}
            {content.repositoryLink && (
                <div
                    className="w-full justify-center mt-5 mb-2 flex items-center gap-1 cursor-pointer transition-all hover:underline hover:text-[#1C68FF]"
                    onClick={() => window.open(content.repositoryLink, '_blank')}
                >
                    <TechIcon name="github" size={22} />
                    <span>Visit the repository</span>
                </div>
            )}
        </div>
    );
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
            icon: DashdoorIcon,
            content: {
                title: 'Food Delivery Application - DashDoor',
                dateTime: '2025 - 2 months',
                techStack: [
                    'react',
                    'typescript',
                    'redux',
                    'scss',
                    'springboot',
                    'java',
                    'mongodb'
                ],
                content: (
                    <>
                        <p className="mb-2 font-bold text-xs">A comprehensive web application that simulates a food delivery service, connecting customers, restaurants, and delivery drivers. Built with a modern tech stack to provide real-time order management and delivery tracking.</p>
                        <p className="mb-1 font-bold text-xs">Key Features:</p>
                        <ul className="list-disc ml-3 mb-3">
                            <li>Developed a role-based platform with distinct portals for customers, restaurants, and dashers, each with tailored user experiences and access permissions.</li>
                            <li>Implemented real-time order tracking using Redux Toolkit and RTK Query to manage asynchronous API calls and global state updates.</li>
                            <li>Enabled customer features including account creation, restaurant browsing, menu item selection, cart management, and order placement.</li>
                            <li>Created restaurant dashboards for managing menus, accepting/rejecting orders, and tracking order statuses.</li>
                            <li>Built dasher tools to accept delivery requests, view routes, and update order delivery statuses, simulating a real-time logistics workflow.</li>
                            <li>Integrated MongoDB for flexible, schema-less data management across user types and transactions.</li>
                            <li>Secured RESTful API endpoints with Spring Boot and applied clean separation of concerns using service/controller layers.</li>
                            <li>Designed a responsive, SCSS-styled UI for seamless cross-device compatibility and user experience consistency.</li>
                            <li>Deployed with development efficiency in mind using modular React components and strong TypeScript typing for maintainability and scalability.</li>
                            <li>Ensured high performance and smooth UX through effective API caching, optimistic updates, and prefetching with RTK Query.</li>
                        </ul>
                        <p className="mb-1 font-bold text-xs">Tech Stack</p>
                        <ul className="list-disc ml-3 mb-3">
                            <li>Frontend: React, TypeScript, Redux Toolkit, RTK Query, SCSS</li>
                            <li>Backend: Java, Spring Boot, MongoDB</li>
                            <li>Tooling: GitHub Projects, Postman, IntelliJ, VS Code</li>
                        </ul>
                        <p className="mb-1 font-bold text-xs">Features Showcase:</p>
                        <div className="flex flex-col justify-center items-center mb-4">
                            <div className="mb-4">
                                <img src='https://raw.githubusercontent.com/jiangtianh/5500-final-frontend/master/docs/images/customer-demo.gif' />
                                <p>*Customers can browse restaurants, place orders, and track deliveries*</p>
                            </div>
                            <div className="mb-4">
                                <img src='https://raw.githubusercontent.com/jiangtianh/5500-final-frontend/master/docs/images/restaurant-demo.gif' />
                                <p>*Restaurants can accept orders, update order status, and create, upload, delete menu items*</p>
                            </div>
                            <div className="mb-4">
                                <img src='https://raw.githubusercontent.com/jiangtianh/5500-final-frontend/master/docs/images/dasher-demo.gif' />
                                <p>*Dashers can accept deliverys, update the status*</p>
                            </div>
                        </div>
                    </>
                ),
                repositoryLink: 'https://github.com/jiangtianh/5500-final-frontend'
            }
        },
        'slideSpeak': {
            id: 'slideSpeak',
            name: 'SlideSpeak',
            type: 'file',
            category: 'AI Projects',
            icon: ProjectIcon,
            content: {
                title: 'SlideSpeak - AI Presentation Generator (Qualcomm Technologies x Northeastern University Hackathon)',
                dateTime: '2025 March 15th - 16th',
                techStack: [
                    'ollama',
                    'python'
                ],
                content: (
                    <>
                        <p className="mb-1 font-bold text-xs">SlideSpeak is a Python-based AI tool designed for:</p>
                        <ul className="list-disc ml-3 mb-4 font-bold">
                            <li>Converting text queries into PowerPoint presentations and speech transcripts.</li>
                            <li>Converting speech transcripts into audio files per slide for presentation rehearsal.</li>
                        </ul>
                        <p className="mb-1 font-bold text-xs">Key Features:</p>
                        <ul className="list-disc ml-3 mb-3">
                            <li>An AI-powered tool that converts user input into PowerPoint slides and slide-specific audio using on-device LLMs (Qwen2.5-7B via Ollama) and local TTS engines (Kokoro ONNX / pyttsx3).</li>
                            <li>Engineered both a Tkinter GUI and a CLI interface for flexible user interaction and batch processing.</li>
                            <li>Integrated python-pptx to dynamically generate structured slide decks from model-generated content.</li>
                            <li>Enabled edge device compatibility by supporting Qualcomm NPU execution through AnythingLLM APIs.</li>
                            <li>Designed modular architecture for transcript generation, slide creation, and speech synthesis, supporting extensibility and offline use.</li>
                        </ul>
                        <p className="mb-1 font-bold text-xs">Tech Stack</p>
                        <ul className="list-disc ml-3 mb-3">
                            <li>Language: Python</li>
                            <li>AI & LLMs: Ollama (running Qwen 2.5)</li>
                            <li>TTS (Text-to-Speech): Kokoro TTS, pyttsx3 (for faster, lightweight TTS)</li>
                            <li>Libraries & Tools: python-pptx (for generating PowerPoint slides)</li>
                            <li>UI: Tkinter-based GUI, CLI</li>
                        </ul>
                        <p className="mb-1 font-bold text-xs">Features Showcase:</p>
                        <div className="flex flex-col justify-center items-center mb-4">
                            <div className="mb-4">
                                <img src='https://raw.githubusercontent.com/zhangshi0512/SlideSpeak/main/screenshots/live_demo_npu-ezgif.com-speed.gif' />
                                <p>*Text2PPT Live Demo Using NPU*</p>
                            </div>
                            <div className="mb-4">
                                <img src='https://raw.githubusercontent.com/zhangshi0512/SlideSpeak/main/screenshots/live_demo_cpu-ezgif.com-speed.gif' />
                                <p>*Text2PPT Live Demo Using CPU*</p>
                            </div>
                            <div className="mb-4">
                                <img src='https://raw.githubusercontent.com/zhangshi0512/SlideSpeak/main/screenshots/live_demo_tts.gif' />
                                <p>*Text2Audio Live Demo Using Pyttsx3*</p>
                            </div>
                        </div>
                    </>
                ),
                repositoryLink: 'https://github.com/zhangshi0512/SlideSpeak'
            }
        },
        'skierResortApp': {
            id: 'skierResortApp',
            name: 'Ski Resort Microservice',
            type: 'file',
            category: 'Microservice',
            icon: ProjectIcon,
            content: {}
        },
        'reactTicketManagementApp': {
            id: 'reactTicketManagementApp',
            name: 'Ticket Management App',
            type: 'file',
            category: 'Full Stack',
            icon: ProjectIcon,
            content: {}
        },

    }
}