import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => (
  <div className="admin-shell lg:flex">
    <AdminSidebar />
    <div className="flex-1 overflow-x-hidden">
      <Outlet />
    </div>
  </div>
);

export default AdminLayout;
