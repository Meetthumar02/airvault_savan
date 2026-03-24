import { useState } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import BASE_URI from "@/config";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [name, setName] = useState(localStorage.getItem("adminName") || "");
  const [email, setEmail] = useState(localStorage.getItem("adminEmail") || "");
  const [password, setPassword] = useState("");

  // Toast notification state
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState("success"); // success | error

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 1000);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`${BASE_URI}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminName");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("isAdminLoggedIn");
      navigate("/admin", { replace: true });
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${BASE_URI}/api/auth/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("adminName", name);
        localStorage.setItem("adminEmail", email);
        showToast("Profile updated successfully", "success");
        setProfileOpen(false);
        setPassword("");
      } else {
        showToast(data.message, "error");
      }
    } catch (err) {
      console.error("Update failed:", err);
      showToast("Update failed", "error");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-blue-900 text-white flex flex-col z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } transition-transform duration-200`}
      >
        {/* Logo */}
        <div className="p-6 flex justify-center border-b border-blue-700">
          <img src="/public/Logo.webp" alt="Admin Logo" className="h-16 w-auto object-contain" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 space-y-1">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block px-6 py-3 rounded-l-full transition ${isActive ? "bg-[#E5A121] text-white font-semibold shadow-md" : "hover:bg-blue-800"
              }`
            }
          >
            Dashboard
          </NavLink>
          {/* <NavLink
            to="/admin/services"
            className={({ isActive }) =>
              `block px-6 py-3 rounded-l-full transition ${isActive ? "bg-[#E5A121] text-white font-semibold shadow-md" : "hover:bg-blue-800"
              }`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/admin/blog"
            className={({ isActive }) =>
              `block px-6 py-3 rounded-l-full transition ${isActive ? "bg-[#E5A121] text-white font-semibold shadow-md" : "hover:bg-blue-800"
              }`
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/admin/case-studies"
            className={({ isActive }) =>
              `block px-6 py-3 rounded-l-full transition ${isActive ? "bg-[#E5A121] text-white font-semibold shadow-md" : "hover:bg-blue-800"
              }`
            }
          >
            Case Studies
          </NavLink> */}

          <NavLink
            to="/admin/internship"
            className={({ isActive }) =>
              `block px-6 py-3 rounded-l-full transition ${isActive ? "bg-[#E5A121] text-white font-semibold shadow-md" : "hover:bg-blue-800"
              }`
            }
          >
            Internship
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-4 md:px-6 py-4 flex justify-between items-center border-b border-gray-200">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-blue-900">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <h1 className="text-xl font-semibold text-blue-900">
            Admin <span className="text-[#E5A121]">Panel</span>
          </h1>

          {/* User dropdown */}
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="p-2 rounded-full hover:bg-gray-200">
              <User size={24} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setProfileOpen(true);
                    setDropdownOpen(false);
                  }}
                >
                  Update Profile
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto bg-gray-50">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white text-center py-4 shadow border-t border-gray-200 text-gray-600 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#E5A121] font-semibold">Admin Panel</span>. All rights reserved.
        </footer>
      </div>

      {/* Profile Modal */}
      {profileOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly
              className="w-full px-3 py-2 mb-3 border rounded"
            />
            <input
              type="password"
              placeholder="New Password (optional)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setProfileOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleProfileUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastVisible && (
        <div
          className="fixed top-4 right-4 bg-blue-600 text-white font-semibold px-6 py-3 rounded shadow-lg z-50 animate-slide-down"
        >
          {toastMessage}
        </div>
      )}

    </div>
  );
};

export default AdminLayout;
