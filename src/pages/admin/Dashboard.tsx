import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const [internshipCount, setInternshipCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin");
  };

  // ✅ Fetch Internship Count
  useEffect(() => {
    fetchInternshipCount();
  }, []);

  const fetchInternshipCount = async () => {
    try {
      const res = await axios.get("http://localhost:8090/api/internship");
      setInternshipCount(res.data.count); // 👈 yaha se count le rahe hai
    } catch (error) {
      console.error("Error fetching internship count:", error);
    }
  };

  // ✅ Stats with dynamic internship count
  const stats = [
    // { title: "Total Services", value: 12, color: "bg-blue-500" },
    // { title: "Total Blogs", value: 34, color: "bg-[#E5A121]" },
    // { title: "Case Studies", value: 7, color: "bg-green-500" },
    {
      title: "Internship Users",
      value: internshipCount, // 👈 dynamic value
      color: "bg-blue-900",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        Welcome to Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl text-white shadow-lg ${item.color}`}
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-3xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;