import { IconUserSquareRounded } from "@tabler/icons-react"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <ul className="flex items-center justify-end gap-3 ml-auto" >
            <Link className="text-[#003050]" to={"/login"}>Login</Link>
            <div>
                <div className="flex items-center gap-4">
                    <IconUserSquareRounded size={47} stroke={1.5} color="#003B8C" />
                    <div className="flex flex-col">
                        <p className="font-medium text-sm leading-[21px] text-[#003050]">Suhas Palukuri</p>
                        <p className="font-medium text-[12px] leading-[18px] text-[#00D1FF]">Student</p>
                    </div>
                </div>
            </div>
        </ul >
    )
}

export default Header