import React, { useEffect, useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = parseJwt(token);
    if (decoded?.email) setEmail(decoded.email);

    const fetchBalance = async () => {
      try {
        const res = await axios.get("https://paynet-cdji.onrender.com/api/user/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(res.data.balance);
      } catch (error) {
        console.error("فشل في جلب الرصيد:", error);
      }
    };

    fetchBalance();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md text-blue-700" dir="rtl">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between relative">

        {/* Right - اسم المستخدم */}
        <div className="text-sm md:text-base font-medium text-blue-700">
          {email ? `اسم المستخدم: ${email}` : "جاري التحميل..."}
        </div>

        {/* Center - Navigation Links (hidden on small screens) */}
<ul className="hidden md:flex gap-6 items-center text-sm font-medium whitespace-nowrap">
          <li>
            <Link to="/" className="hover:text-white hover:bg-blue-600 px-3 py-1 rounded transition">
              الصفحة الرئيسية
            </Link>
          </li>
          <li>
            <Link to="/financial" className="hover:text-white hover:bg-blue-600 px-3 py-1 rounded transition">
              البيان المالي للتسديد
            </Link>
          </li>
          <li>
            <Link to="/pending" className="hover:text-white hover:bg-blue-600 px-3 py-1 rounded transition">
              عمليات قيد الترحيل
            </Link>
          </li>
          <li>
            <Link to="/balance" className="hover:text-white hover:bg-blue-600 px-3 py-1 rounded transition">
              تعبئة رصيد
            </Link>
          </li>
          <li>
            <Link to="/PaymentStatement" className="hover:text-white hover:bg-blue-600 px-3 py-1 rounded transition">
              البيان المالي للدفعات
            </Link>
          </li>
          <li className="text-blue-900 font-bold">
            {balance !== null ? `رصيدك: ${balance} ل.س` : "جاري التحميل..."}
          </li>
        </ul>

        {/* Left - Logout button */}
        <div className="flex items-center gap-4">
          {/* Toggle (mobile only) */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 text-red-600 hover:bg-red-100 px-3 py-1 rounded transition"
          >
            <LogOut size={18} />
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow px-6 py-4 space-y-2 border-t">
          <Link to="/" className="block py-2 px-3 hover:bg-blue-100 rounded">الصفحة الرئيسية</Link>
          <Link to="/financial" className="block py-2 px-3 hover:bg-blue-100 rounded">البيان المالي للتسديد</Link>
          <Link to="/pending" className="block py-2 px-3 hover:bg-blue-100 rounded">عمليات قيد الترحيل</Link>
          <Link to="/balance" className="block py-2 px-3 hover:bg-blue-100 rounded">تعبئة رصيد</Link>
          <Link to="/PaymentStatement" className="block py-2 px-3 hover:bg-blue-100 rounded">البيان المالي للدفعات</Link>
          <div className="text-sm font-semibold text-blue-900">
            {balance !== null ? `رصيدك: ${balance} ل.س` : "جاري التحميل..."}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:bg-red-100 px-3 py-2 rounded mt-2"
          >
            <LogOut size={18} />
            تسجيل الخروج
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
