import { FaBook, FaBriefcaseMedical, FaEnvira } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GrTechnology } from "react-icons/gr";
import { LuFileSpreadsheet } from "react-icons/lu";
import {
	MdAttachMoney,
	MdOutlineScience,
	MdSportsVolleyball,
} from "react-icons/md";
import { RiFilePaperFill } from "react-icons/ri";
import { SiAnimalplanet } from "react-icons/si";
import { TbMath } from "react-icons/tb";

export const tabs = [
	{ id: 1, value: "animals", icon: <SiAnimalplanet /> },
	{ id: 2, value: "business", icon: <MdAttachMoney /> },
	{ id: 3, value: "education", icon: <LuFileSpreadsheet /> },
	{ id: 4, value: "enviroment", icon: <FaEnvira /> },
	{ id: 5, value: "finance", icon: <FaMoneyBillTrendUp /> },
	{ id: 6, value: "health", icon: <FaBriefcaseMedical /> },
	{ id: 7, value: "history", icon: <RiFilePaperFill /> },
	{ id: 8, value: "literature", icon: <FaBook /> },
	{ id: 9, value: "maths", icon: <TbMath /> },
	{ id: 10, value: "science", icon: <MdOutlineScience /> },
	{ id: 11, value: "sports", icon: <MdSportsVolleyball /> },
	{ id: 12, value: "technology", icon: <GrTechnology /> },
	{ id: 13, value: "noKey", icon: <MdAttachMoney /> },
];
