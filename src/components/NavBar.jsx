import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useNotification } from "../context/NotificationContext";

import {
  FaWhatsapp,
  FaHome,
  FaMoneyBill,
  FaExchangeAlt,
  FaSignOutAlt,
  FaWallet,
  FaFileInvoice,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
      const {hasNewUnpaid, setHasNewUnpaid } = useNotification(); // ✅ Context
      const [role, setRole] = useState("");


  

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
  if (decoded?.role) setRole(decoded.role); // ✅ استخراج الدور

  const fetchBalance = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/user/balance",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
    <nav className="bg-gray-300 shadow-md text-slate-900" dir="rtl">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between relative">
        {/* Right - اسم المستخدم */}
        <div className="text-sm md:text-base font-medium text-violet-500">
          {email ? `👤 ${email}` : "جاري التحميل..."}
        </div>

        {/* Center - Navigation Links */}
        <ul className="hidden md:flex gap-6 items-center text-sm font-medium whitespace-nowrap">
          <li>
            <Link
              to="/"
              className="hover:text-white hover:bg-violet-700 px-3 py-1 rounded transition flex items-center gap-1"
            >
              <FaHome /> الصفحة الرئيسية
            </Link>
          </li>

          <li className="relative">
            <Link
              to="/financial"
              className="hover:text-white hover:bg-violet-700 px-3 py-1 rounded transition flex items-center gap-1 relative"
            >
              <FaMoneyBill /> البيان المالي للتسديد
              {hasNewUnpaid && (
                <span className="absolute -top-1 -right-2 block h-3 w-3 rounded-full bg-red-600"></span>
              )}
            </Link>
          </li>

          <li>
            <Link
              to="/pending"
              className="hover:text-white hover:bg-violet-700 px-3 py-1 rounded transition flex items-center gap-1"
            >
              <FaExchangeAlt /> عمليات قيد الترحيل
            </Link>
          </li>
                        {role === "user-point" &&(
            <>
          <li>
            <Link
              to="/PointPayment"
              className="hover:text-white hover:bg-violet-700 px-3 py-1 rounded transition flex items-center gap-1"
            >
              <FaWallet /> البيان المالي للدفعات
            </Link>
          </li>

            </>
          )}



          
  {role === "user" && (
<>
          <li>
            <Link
              to="/balance"
              className="hover:text-white hover:bg-violet-700 px-3 py-1 rounded transition flex items-center gap-1"
            >
              <FaWallet /> تعبئة رصيد
            </Link>
          </li>
          <li>
            <Link
              to="/PaymentStatement"
              className="hover:text-white hover:bg-violet-700 px-3 py-1 rounded transition flex items-center gap-1"
            >
              <FaFileInvoice /> البيان المالي للدفعات
            </Link>
          </li>


          <li>
            <Link
              to="/add-point"
              className="hover:text-white hover:bg-violet-700 px-3 py-1 rounded transition flex items-center gap-1"
            >
              <FaFileInvoice /> نقاط البيع الفرعية
            </Link>
          </li>

          <li>
            <Link
              to="/financial-point"
              className="hover:text-white hover:bg-violet-700 px-3 py-1 rounded transition flex items-center gap-1"
            >
              <FaFileInvoice /> البيان المالي للنقاط الفرعية
            </Link>
          </li>
          <li>
            <Link
              to="/pointStatement"
              className="hover:text-white hover:bg-violet-700 px-3 py-1 rounded transition flex items-center gap-1"
            >
              <FaFileInvoice /> دفعات النقاط الفرعية
            </Link>
          </li>

          <li>
            <a
              href="https://wa.me/963993822320"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-green-700 px-3 py-1 rounded transition text-green-500 flex items-center gap-1"
            >
              <FaWhatsapp /> واتساب
            </a>
          </li>

          </>
            )}
          <li className="text-violet-500 font-bold">
            {balance !== null ? `💰 ${balance} ل.س` : "جاري التحميل..."}
          </li>
        </ul>
    
        {/* Left - Logout button & Mobile toggle */}
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-black">
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 text-red-400 hover:bg-red-900 px-3 py-1 rounded transition"
          >
            <FaSignOutAlt /> تسجيل الخروج
          </button>
        </div>
      </div>  

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 shadow px-6 py-4 space-y-2 border-t border-slate-700 text-white">
          <Link
            to="/"
            className="block py-2 px-3 hover:bg-slate-700 rounded flex items-center gap-1"
          >
            <FaHome /> الصفحة الرئيسية
          </Link>
          <Link
            to="/financial"
            className="block py-2 px-3 hover:bg-slate-700 rounded flex items-center gap-1 relative"
          >
            <FaMoneyBill /> البيان المالي للتسديد
            {hasNewUnpaid && (
              <span className="absolute top-1 right-2 block h-3 w-3 rounded-full bg-red-600"></span>
            )}
          </Link>
          <Link
            to="/pending"
            className="block py-2 px-3 hover:bg-slate-700 rounded flex items-center gap-1"
          >
            <FaExchangeAlt /> عمليات قيد الترحيل
          </Link>
            
                      {role === "user-point" &&(
                        <>
                                <Link
                        to="/PointPayment"
                        className="block py-2 px-3 hover:bg-slate-700 rounded flex items-center gap-1"
                      >
                        <FaExchangeAlt /> البيان المالي للدفعات
                      </Link>
            
                        </>
                      )}
            {role === "user" && (
<>
          <Link
            to="/balance"
            className="block py-2 px-3 hover:bg-slate-700 rounded flex items-center gap-1"
          >
            <FaWallet /> تعبئة رصيد
          </Link>
          <Link
            to="/PaymentStatement"
            className="block py-2 px-3 hover:bg-slate-700 rounded flex items-center gap-1"
          >
            <FaFileInvoice /> البيان المالي للدفعات
          </Link>
          <Link
            to="/add-point"
            className="block py-2 px-3 hover:bg-slate-700 rounded flex items-center gap-1"
          >
            <FaFileInvoice /> نقاط البيع الفرعية
          </Link>
          <Link
            to="/financial-point"
            className="block py-2 px-3 hover:bg-slate-700 rounded flex items-center gap-1"
          >
            <FaFileInvoice /> البيان المالي للنقاط الفرعية
          </Link>
          <Link
            to="/pointStatement"
            className="block py-2 px-3 hover:bg-slate-700 rounded flex items-center gap-1"
          >
            <FaFileInvoice /> دفعات النقاط الفرعية
          </Link>
          <a
            href="https://wa.me/963993822320"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 px-3 hover:bg-green-700 rounded text-green-400 flex items-center gap-1"
          >
            <FaWhatsapp /> واتساب
          </a>
          </>
          )}
          <div className="text-sm font-semibold text-violet-300">
            {balance !== null ? `💰 ${balance} ل.س` : "جاري التحميل..."}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:bg-red-900 px-3 py-2 rounded mt-2"
          >
            <FaSignOutAlt /> تسجيل الخروج
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
