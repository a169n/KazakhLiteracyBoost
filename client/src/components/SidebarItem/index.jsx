import { Link } from "react-router-dom";

const SidebarItem = ({ svgIcon: Icon, size, stroke, color, label, link }) => {
  return (
    <Link
      to={link}
      className={`flex gap-[15px] items-center transition-colors duration-300 ease-in-out `}>
      <Icon size={size} stroke={stroke} color={color} />
      <span
        className={`text-[#003B8C] font-semibold text-[20px] leading-[30px] capitalize '}`}>
        {label}
      </span>
    </Link>
  );
};

export default SidebarItem;
