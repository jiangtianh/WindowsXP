import { FaGithub, FaReact, FaJava, FaPython, FaAws, FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiRedux, SiSpringboot, SiMongodb, SiOllama, SiApachetomcat, SiRabbitmq, SiAmazonec2, SiApachejmeter, SiMysql, SiExpress } from "react-icons/si";
import { BsFiletypeScss } from "react-icons/bs";
import { DiRedis } from "react-icons/di";

const DEFAULT_ICON_SIZE = 28;

type IconProps = {
    size?: number;
    className?: string;
};

export type IconName =
    | "react"
    | "typescript"
    | "redux"
    | "scss"
    | "springboot"
    | "java"
    | "mongodb"
    | "github"
    | "ollama"
    | "python"
    | "tomcat"
    | "redis"
    | "aws"
    | "rabbitmq"
    | "amazonec2"
    | "apachejmeter"
    | "mysql"
    | "nodejs"
    | "express";

export const TechIcon: React.FC<{ name: IconName } & IconProps> = ({
    name,
    size = DEFAULT_ICON_SIZE,
    className
}) => {
    const iconProps = { size, className };
    switch (name) {
        case "react":
            return <FaReact {...iconProps} />;
        case "typescript":
            return <SiTypescript {...iconProps} />;
        case "redux":
            return <SiRedux {...iconProps} />;
        case "scss":
            return <BsFiletypeScss {...iconProps} />;
        case "springboot":
            return <SiSpringboot {...iconProps} />;
        case "java":
            return <FaJava {...iconProps} />;
        case "mongodb":
            return <SiMongodb {...iconProps} />;
        case "github":
            return <FaGithub {...iconProps} />;
        case "ollama":
            return <SiOllama {...iconProps} />;
        case "python":
            return <FaPython {...iconProps} />;
        case "tomcat":
            return <SiApachetomcat {...iconProps} />;
        case "redis":
            return <DiRedis {...iconProps} />;
        case "aws":
            return <FaAws {...iconProps} />;
        case "rabbitmq":
            return <SiRabbitmq {...iconProps} />;
        case "amazonec2":
            return <SiAmazonec2 {...iconProps} />;
        case "apachejmeter":
            return <SiApachejmeter {...iconProps} />;
        case "mysql":
            return <SiMysql {...iconProps} />;
        case "nodejs":
            return <FaNodeJs {...iconProps} />;
        case "express":
            return <SiExpress {...iconProps} />;
        default:
            return null;
    }
}