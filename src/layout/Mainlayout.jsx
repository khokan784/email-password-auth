import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Mainlayout = () => {
    return (
        <div className="max-w-5xl mx-auto">
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Mainlayout;