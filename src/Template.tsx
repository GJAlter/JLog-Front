import { Outlet } from "react-router-dom"
import Header from "./Pages/Header"

const Template = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Template;