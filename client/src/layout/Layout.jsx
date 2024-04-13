import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <div className="flex w-full min-h-[100vh] justify-center items-center">
            <Outlet />
        </div>
    )
}

export default Layout