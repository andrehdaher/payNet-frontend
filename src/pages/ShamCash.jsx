import React, { useState } from "react";
import Navbar from "../components/NavBar";
import axios from "axios";
import qrImage from "../assets/QRcode.png";


export default function ShamCash() {

  const [formData, setFormData] = useState({
    name: "",
    destination: "andreh daher",
    number: "",
    operator: "",
    noticeNumber: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await axios.post("http://localhost:5000/api/saveBalance/haram", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("تم تحويل الإشعار بنجاح");

    setFormData({
      name: "",
      destination: "andreh daher",
      number: "",
      operator: "",
      noticeNumber: "",
      amount: "",
      date: "",
    });
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-4"
          dir="rtl"
        >
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
            نموذج تحويل
          </h2>

          <input
            name="name"
            type="text"
            placeholder="اسم المستخدم"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="destination"
            type="text"
            placeholder="الى"
            value={formData.destination}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />

      {/* ✅ QR Image بدل مربع الرقم */}
<div className="text-center space-y-2">
  <p className="font-semibold text-sm text-gray-600">امسح رمز QR التالي للتحويل إلى الرقم:</p>
  <img src={qrImage} alt="QR Code" className="mx-auto w-40 h-40 object-contain" />
</div>


          <input
            name="operator"
            type="text"
            placeholder="صاحب التحويل"
            value={formData.operator}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />

          <input
            name="noticeNumber"
            type="text"
            placeholder="رقم العملية (اختياري)"
            value={formData.noticeNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            
          />

          <input
            name="amount"
            type="number"
            placeholder="المبلغ"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />

          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            تحويل
          </button>
        </form>
      </div>
    </div>
  );
}
