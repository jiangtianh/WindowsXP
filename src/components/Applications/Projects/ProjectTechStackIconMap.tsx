import { FaGithub, FaReact, FaJava } from "react-icons/fa";
import { SiTypescript, SiRedux, SiSpringboot, SiMongodb } from "react-icons/si";
import { BsFiletypeScss } from "react-icons/bs";

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
    | "github";

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
        default:
            return null;
    }
}