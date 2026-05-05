import { FolderKanban, Inbox, LayoutDashboard, LogOut, MessageSquareText, Scissors, Star } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const items = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Projects", to: "/admin/projects", icon: FolderKanban },
  { label: "Services", to: "/admin/services", icon: Scissors },
  { label: "Testimonials", to: "/admin/testimonials", icon: Star },
  { label: "Contacts", to: "/admin/contacts", icon: Inbox }
];

const AdminSidebar = () => {
  const { logout, user } = useAuth();

  return (
    <aside className="border-b border-white/10 bg-charcoal/95 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="p-5">
        <div className="mb-8">
          <p className="eyebrow mb-2">Admin</p>
          <h1 className="text-xl font-black text-white">Rajkumar Admin</h1>
          <p className="mt-1 text-sm text-fog">{user?.email}</p>
        </div>
        <nav className="grid gap-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                end={item.end}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-[8px] px-4 py-3 text-sm font-bold transition ${
                    isActive ? "bg-electric text-ink" : "text-fog hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <button className="mt-7 flex w-full items-center gap-3 rounded-[8px] border border-white/10 px-4 py-3 text-sm font-bold text-fog transition hover:border-red-400 hover:text-red-200" onClick={logout} type="button">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
