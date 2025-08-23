import React, { useState ,useEffect ,useRef } from "react";
import Navbar from "../components/NavBar";
import axios from "axios";
import qrImage from "../assets/QRcode.png";


export default function ShamCash() {
  
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
    destination: "andreh daher",
    number: "",
    operator: "",
    noticeNumber: "",
    amount: "",
    date: "",
  });
    const [isSubmitting, setIsSubmitting] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (isSubmitting) return; // حماية إضافية
      setIsSubmitting(true);

    const token = localStorage.getItem("token");

    await axios.post("https://paynet-1.onrender.com/api/saveBalance/haram", formData, {
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
        setIsSubmitting(false); // إعادة التفعيل

  };

      useEffect(() => {
  const token = localStorage.getItem("token");
  const decoded = parseJwt(token);
  if (decoded && decoded.email) {
    setFormData((prev) => ({ ...prev, name: decoded.email }));
  }
}, []);

  return (
    <div>
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
            className="w-full border bg-[#00000080] text-white border-none rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            name="noticeNumber"
            type="text"
            placeholder="رقم العملية (اختياري)"
            value={formData.noticeNumber}
            onChange={handleChange}
            className="w-full border bg-[#00000080] text-white border-none rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            
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
