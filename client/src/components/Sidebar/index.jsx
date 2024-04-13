import { IconCards, IconHelpSquareRounded, IconSmartHome } from "@tabler/icons-react";
import SidebarItem from "../SidebarItem";

const Sidebar = () => {
    return (
        <ul className="flex flex-col gap-[50px] ">
            <SidebarItem link={"/"} svgIcon={IconSmartHome} size={33} stroke={1.5} color="#003B8C" label={"Home"} />
            <SidebarItem link={"/cards"} svgIcon={IconCards} size={33} stroke={1.5} color="#003B8C" label={"Flashcards"} />
            <SidebarItem link={"/quizzes"} svgIcon={IconHelpSquareRounded} size={33} stroke={1.5} color="#003B8C" label={"Quizzes"} />
        </ul>
    )
}

export default Sidebar;