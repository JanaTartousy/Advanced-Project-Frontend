import { Outlet, useNavigate} from "react-router-dom";
import Sidebar from "./../../components/Sidebar/sidebar";
import { useState } from "react";
import "./dashboard.css";
import { ToastContainer } from "react-toastify";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (

    <>
      <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      <div className={isSidebarOpen ? 'sidebar-open-content' : 'sidebar-closed-content'}>
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
