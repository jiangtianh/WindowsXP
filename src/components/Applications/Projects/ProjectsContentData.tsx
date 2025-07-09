const ProjectIcon = "/icons/StartMenuPrograms128x128.webp";
const DashdoorIcon = "/icons/DashDoor128x128.webp";
const IMDBIcon = "/icons/IMDB128x128.webp";
const SlideSpeakIcon = "/icons/SlideSpeak128x128.webp";
const SkierResortAppIcon = "/icons/SkiResortApp128x128.webp";
const TechNoteIcon = "/icons/TechNote128x128.webp";
const ArtStyleRecoginitionIcon = "/icons/ArtStyleRecognition128x128.webp";
const P5jsFolderIcon = "/icons/P5jsFolder128x128.webp";
const P5jsFileIcon = "/icons/P5jsFile128x128.webp";

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
    type: 'file' | 'folder' | 'p5js';
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
};
export const renderP5jsContent = (content: ProjectContent) => {
    return (
        <div className="w-full h-full">
            {content.content}
        </div>
    )
}

export const projectsContentData: ProjectFolderItem = {
    id: 'root',
    name: 'My Projects',
    type: 'folder',
    icon: ProjectIcon,
    showCategories: true,
    children: {
        'dashdoor': {
            id: 'dashdoor',
            name: 'DashDoor',
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
                                <img className="w-full" src='https://raw.githubusercontent.com/jiangtianh/5500-final-frontend/master/docs/images/customer-demo.gif' />
                                <p>*Customers can browse restaurants, place orders, and track deliveries*</p>
                            </div>
                            <div className="mb-4">
                                <img className="w-full" src='https://raw.githubusercontent.com/jiangtianh/5500-final-frontend/master/docs/images/restaurant-demo.gif' />
                                <p>*Restaurants can accept orders, update order status, and create, upload, delete menu items*</p>
                            </div>
                            <div className="mb-4">
                                <img className="w-full" src='https://raw.githubusercontent.com/jiangtianh/5500-final-frontend/master/docs/images/dasher-demo.gif' />
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
            category: 'AI & ML Projects',
            icon: SlideSpeakIcon,
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
                        <p className="mb-1 font-bold text-xs">Tech Stack:</p>
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
                                <img className="w-full" src='https://raw.githubusercontent.com/zhangshi0512/SlideSpeak/main/screenshots/live_demo_npu-ezgif.com-speed.gif' />
                                <p>*Text2PPT Live Demo Using NPU*</p>
                            </div>
                            <div className="mb-4">
                                <img className="w-full" src='https://raw.githubusercontent.com/zhangshi0512/SlideSpeak/main/screenshots/live_demo_cpu-ezgif.com-speed.gif' />
                                <p>*Text2PPT Live Demo Using CPU*</p>
                            </div>
                            <div className="mb-4">
                                <img className="w-full" src='https://raw.githubusercontent.com/zhangshi0512/SlideSpeak/main/screenshots/live_demo_tts.gif' />
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
            icon: SkierResortAppIcon,
            content: {
                title: 'AWS Skier Resort Record-Keeping Microservice',
                dateTime: '2024 - 3 months',
                techStack: [
                    'java',
                    'aws',
                    'amazonec2',
                    'rabbitmq',
                    'redis',
                    'tomcat',
                    'apachejmeter'
                ],
                content: (
                    <>
                        <p className="mb-5 font-bold text-xs">A distributed microservice system for recording and querying skier lift data, deployed on AWS with load-balanced EC2 instances running multithreaded Java servlets. It uses Redis for caching, RabbitMQ for asynchronous message processing, and connection pools for efficiency, achieving high throughput through performance tuning.</p>
                        <p className="mb-1 font-bold text-xs">Architecture:</p>
                        <div className="flex flex-col justify-center items-center mb-4">
                            <div className="mb-4">
                                <p className="text-xs">GET architecture:</p>
                                <img className="w-full" src='https://raw.githubusercontent.com/jiangtianh/CS6650_codebase/main/doc/GET.jpg' />
                            </div>
                            <div className="mb-4">
                                <p className="text-xs">POST architecture</p>
                                <img className="w-full" src='https://raw.githubusercontent.com/jiangtianh/CS6650_codebase/main/doc/POST.jpg' />
                            </div>
                        </div>
                        <p className="mb-1 font-bold text-xs">Key Features:</p>
                        <ul className="list-disc ml-3 mb-3">
                            <li>Designed and implemented a distributed system to record and query skier lift data, deployed on AWS with a load balancer and four EC2 instances running multi-threaded Java servlets on Tomcat.</li>
                            <li>Utilized Redis for fast caching and data retrieval, ensuring low-latency responses for requests. POST requests followed an eventual consistency model, publishing messages to RabbitMQ for asynchronous processing.</li>
                            <li>Multiple multi-threaded Java consumers processed messages from RabbitMQ with batch acknowledgement, enhancing reliability and reducing network RTT.</li>
                            <li>Leveraged Jedis Pool and RabbitMQ Pool for efficient connection management across nodes.</li>
                            <li>Fine-tuned the system performance by optimizing the number of nodes and threads for both servers and consumers based on throughput testing, balancing performance with cost-effectiveness.</li>
                        </ul>
                        <p className="mb-1 font-bold text-xs">Tech Stack:</p>
                        <ul className="list-disc ml-3 mb-3">
                            <li>Language: Java</li>
                            <li>Web Server: Apache Tomcat (Servlet-based)</li>
                            <li>Infrastructure: AWS EC2, AWS Application Load Balancer</li>
                            <li>Caching: Redis (with Jedis Pool)</li>
                            <li>Messaging Queue: RabbitMQ (with Java Client & connection pooling)</li>
                            <li>Concurrency: Multithreaded Java (for both server and consumers)</li>
                        </ul>
                    </>
                ),
                repositoryLink: 'https://github.com/jiangtianh/CS6650_codebase'
            }
        },
        'reactTicketManagementApp': {
            id: 'reactTicketManagementApp',
            name: 'TechNote',
            type: 'file',
            category: 'Full Stack',
            icon: TechNoteIcon,
            content: {
                title: 'TechNote - Full Stack Ticket Management Application',
                dateTime: '2024 - 2 months',
                techStack: [
                    'react',
                    'typescript',
                    'redux',
                    'nodejs',
                    'express',
                    'mongodb',
                ],
                content: (
                    <>
                        <p className="mb-5 font-bold text-xs">A full-stack ticket management system for electronic stores, built with the MERN stack. It supports secure user authentication, role-based access control, and efficient ticket handling (create, edit, complete/incomplete). RTK Query and memoized selectors were used to optimize data fetching and rendering performance.</p>
                        <p className="mb-1 font-bold text-xs">Key Features:</p>
                        <ul className="list-disc ml-3 mb-3">
                            <li>A ticket system for electronic stores using the MERN stack, enabling users to log in, sign up, and manage tickets (create, edit, mark as complete/incomplete, etc…)</li>
                            <li>Integrated JWT-based token authentication and role-based access control for secure user management for both client and server, ensuring the system is scalable and secure across different user roles.</li>
                            <li>Utilized RTK Query with prefetching for efficient data handling, reducing load times and improving the user experience. Implemented memoized React selectors to optimize page rendering performance, especially for large datasets of repair tickets.</li>
                        </ul>
                    </>
                ),
                repositoryLink: "https://github.com/jiangtianh/technotes_webapp"
            }
        },
        'imdbDatabase': {
            id: 'imdbDatabase',
            name: 'IMDB clone',
            type: 'file',
            category: 'Relational Database',
            icon: IMDBIcon,
            content: {
                title: 'IMDB Clone - Relational Database Project',
                dateTime: '2024 - 3 months',
                techStack: [
                    'mysql',
                    'java',
                    'tomcat',
                ],
                content: (
                    <>
                        <p className="mb-5 font-bold text-xs">The Movie Database Project is a full-stack web application that allows users to browse, search, rate, and review movies from the IMDB dataset. Built with Java, JDBC, and MySQL, it provides secure and efficient access to a large movie dataset through a web-based interface.</p>
                        <p className="mb-1 font-bold text-xs">Key Features:</p>
                        <ul className="list-disc ml-3 mb-3">
                            <li>Structured movie data using a normalized MySQL schema for scalability and consistency.</li>
                            <li>Implemented core logic in Java using JDBC for database connectivity, handling user interactions like search, review submission, and rating.</li>
                            <li>Users can search movies by title, genre, or year with pagination. Optimized SQL queries for fast performance on large datasets.</li>
                            <li>Secure login and registration with input validation to ensure only authorized access to user-specific features.</li>
                            <li>Users can leave reviews and submit ratings for movies, with real-time updates reflected in the database.</li>
                            <li>Built an intuitive frontend using JSP to display movie information, user reviews, and interactive search results.</li>
                        </ul>
                        <div className="flex flex-col justify-center items-center mb-4">
                            <div className="mb-4">
                                <p className="text-xs">UML:</p>
                                <img className="w-full" src='https://raw.githubusercontent.com/jiangtianh/5200Project/main/UML.png' />
                            </div>
                        </div>
                    </>
                ),
                repositoryLink: 'https://github.com/jiangtianh/5200Project'
            }
        },
        'ArtStyleRecognition': {
            id: 'ArtStyleRecognition',
            name: 'Art Style Recognition',
            type: 'file',
            category: 'AI & ML Projects',
            icon: ArtStyleRecoginitionIcon,
            content: {
                title: 'Art Style Recognition Model',
                dateTime: '2023 - 2 months',
                techStack: [
                    'python',
                    'tensorflow',
                    'django'
                ],
                content: (
                    <>
                        <p className="mb-5 font-bold text-xs">A deep learning model that classifies artworks into 14 distinct art styles, allowing users to upload and identify images through a Django-based web interface.</p>
                        <p className="mb-1 font-bold text-xs">Key Features:</p>
                        <ul className="list-disc ml-3 mb-3">
                            <li>Developed an art style recognition model using TensorFlow, leveraging the powerful VGG 16 architecture for extracting deep image features.</li>
                            <li>Trained the model over 46000 image files classified into 14 art styles, enabling it to distinguish and categorize various art styles with high accuracy.</li>
                            <li>Achieved a top-1 accuracy of 59% and top-5 accuracy of 96% after 49 epochs, demonstrating the model's ability to make correct classifications, even in edge cases. Successfully deployed the model to a web interface where users could upload and classify images of artworks using Django.</li>
                        </ul>
                    </>
                ),
                repositoryLink: 'https://github.com/jiangtianh/art_style_recognition'
            }
        },
        'p5.js': {
            id: 'p5.js',
            name: 'p5.js Experiments',
            type: 'folder',
            icon: P5jsFolderIcon,
            showCategories: false,
            children: {
                'spinningBoxGrid': {
                    id: 'spinningBoxGrid',
                    name: 'Spinning Box Grid',
                    type: 'p5js',
                    icon: P5jsFileIcon,
                    content: {
                        content: (
                            <iframe
                                src="/p5js-projects/SpinningBoxGrid/index.html"
                                title="Spinning Box Grid P5.js"
                                sandbox="allow-scripts allow-same-origin"
                                className="w-full h-full"
                            />
                        )
                    }
                },
                'x&block': {
                    id: 'x&block',
                    name: 'X&Block',
                    type: 'p5js',
                    icon: P5jsFileIcon,
                    content: {
                        content: (
                            <iframe
                                src="/p5js-projects/X&Block/index.html"
                                title="X&Block P5.js"
                                sandbox="allow-scripts allow-same-origin"
                                className="w-full h-full"
                            />
                        )
                    }
                },
                'spinningCircle': {
                    id: 'spinningCircle',
                    name: 'Spinning Circle',
                    type: 'p5js',
                    icon: P5jsFileIcon,
                    content: {
                        content: (
                            <iframe
                                src="/p5js-projects/SpinningCircle/index.html"
                                title="Spinning Circle P5.js"
                                sandbox="allow-scripts allow-same-origin"
                                className="w-full h-full"
                            />
                        )
                    }
                },
                'flowers': {
                    id: 'flowers',
                    name: 'Flowers',
                    type: 'p5js',
                    icon: P5jsFileIcon,
                    content: {
                        content: (
                            <iframe
                                src="/p5js-projects/Flowers/index.html"
                                title="Flowers P5.js"
                                sandbox="allow-scripts allow-same-origin"
                                className="w-full h-full"
                            />
                        )
                    }
                }
            }
        },
    }
}