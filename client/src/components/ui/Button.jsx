import { cn } from "@/utils/mergeStyles";

const Button = ({ children, onClick, className, style, ...props }) => {
    return (
        <button
            className={cn(`py-5 px-[60px] bg-[#FF6300] hover:bg-[#FF7F50] transition-colors flex items-center justify-center text-center font-bold text-xl text-white border-none rounded-[20px] ${className}`)}
            onClick={onClick}
            style={style}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;