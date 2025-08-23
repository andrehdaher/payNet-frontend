import React, { useState , useEffect , useRef } from "react";
import Navbar from "../components/NavBar";
import axios from "axios";


export default function TransferForm() {


          const vantaRef = useRef(null);
      const [vantaEffect, setVantaEffect] = useState(null);
    
      useEffect(() => {
        if (!vantaEffect && window.VANTA) {
          setVantaEffect(
            window.VANTA.NET({
              el: vantaRef.current,
          color: 0x0f172a,
          backgroundColor: 0xeaeaea,
          points: 8.0,
          maxDistance: 20.0,
          spacing: 15.0,
            })
          );
        }
        return () => {
          if (vantaEffect) vantaEffect.destroy();
        };
      }, [vantaEffect]);

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  const [formData, setFormData] = useState({
    name: "",
    destination: "ماهر حبيب ضاهر - محردة - فؤاد ",
    number: "0969735667",
    operator: "",
    noticeNumber: "",
    amount: "",
    date: "",
  });
    const [isSubmitting, setIsSubmitting] = useState(false);



    useEffect(() => {
  const token = localStorage.getItem("token");
  const decoded = parseJwt(token);
  if (decoded && decoded.email) {
    setFormData((prev) => ({ ...prev, name: decoded.email }));
  }
}, []);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (isSubmitting) return; // حماية إضافية
      setIsSubmitting(true);

    const token = localStorage.getItem("token");
    const decoded = parseJwt(token);

    await axios.post("https://paynet-1.onrender.com/api/saveBalance/haram", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("تم تحويل الإشعار بنجاح");

    setFormData({
      name: "",
      destination: "ماهر حبيب ضاهر - محردة - فؤاد ",
      number: "0969735667",
      operator: "",
      noticeNumber: "",
      amount: "",
      date: "",
    });
    setIsSubmitting(false); // إعادة التفعيل

  };

  return (
    <div >
      <Navbar />
      <div ref={vantaRef} className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-[#00000050] p-6 rounded-xl shadow-md space-y-4"
          dir="rtl"
        >
          <h2 className="text-2xl font-bold text-center text-violet-700 mb-4">
            نموذج تحويل
          </h2>

          <input
            name="name"
            type="text"
            placeholder="اسم المستخدم"
            value={formData.name}
            onChange={handleChange}
            className="w-full border bg-[#00000080] text-white border-none rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="destination"
            type="text"
            placeholder="الى"
            value={formData.destination}
            onChange={handleChange}
            className="w-full border bg-[#00000080] text-white border-none rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            name="number"
            type="text"
            placeholder="الرقم"
            value={formData.number}
            onChange={handleChange}
            className="w-full border bg-[#00000080] text-white border-none rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            name="operator"
            type="text"
            placeholder="صاحب الاشعار"
            value={formData.operator}
            onChange={handleChange}
            className="w-full border bg-[#00000080] text-white border-none rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            name="noticeNumber"
            type="text"
            placeholder="رقم الإشعار"
            value={formData.noticeNumber}
            onChange={handleChange}
            className="w-full border bg-[#00000080] text-white border-none rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            name="amount"
            type="number"
            placeholder="المبلغ"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border bg-[#00000080] text-white border-none rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border bg-[#00000080] text-white border-none rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-lg transition"
          >
  {isSubmitting ? "جاري التحويل..." : "تحويل"}
          </button>
        </form>
      </div>
    </div>
  );
}
