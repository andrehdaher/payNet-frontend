import React, { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";

export default function Recharge() {
  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  const [landline, setLandline] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedSpeed, setSelectedSpeed] = useState("");
  const [amountToPay, setAmountToPay] = useState("");

  const calculatedAmount = amountToPay ? (amountToPay * 1.05).toFixed(2) : "";
  const isFormValid =
    landline && selectedCompany && selectedSpeed && amountToPay;

  const companies = [
    "",
    "ناس",
    "برونت",
    "اينت",
    "رنت",
    "الكم",
    "ليما",
    "سوا",
    "اية",
    "يارا",
    "بطاقات",
    "هايبر",
    "ويف",
    "امنية",
    "فيو",
    "ليزر",
    "متس",
    "سما",
    "زاد",
    "دنيا",
    "هاي فاي",
    "تكامل",
    "لاين",
    "الجمعية",
  ];
  const speeds = [
    "",
    "5 GB        السعر 1800",
    "10 GB       السعر 3300",
    "20 GB       السعر 5700",
    "30 GB       السعر 7600",
    "50 GB       السعر 11500",
    "75 GB       السعر 13500",
    "100 GB      السعر 19000",
    "200 GB      السعر 35000",

  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const decoded = parseJwt(token);
    const email = decoded?.email;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/payment/internet",
        { amount: amountToPay },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await axios.post(
        "http://localhost:5000/api/savepayment/internet",
        {
          landline,
          company: selectedCompany,
          speed: selectedSpeed,
          amount: parseFloat(amountToPay),
          email, // ← إذا كنت بحاجة أيضًا للإيميل
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("تم التسديد بنجاح. الرصيد الجديد: " + res.data.newBalance);
      setLandline("");
      setSelectedCompany("");
      setSelectedSpeed("");
      setAmountToPay("");
      window.location.reload();

      // يمكنك إعادة التوجيه أو تحديث الرصيد من السياق
    } catch (err) {
      alert(err.response?.data?.message || "حدث خطأ");
    }
  };
  return (
    <div>
      <NavBar />

      <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
        <form className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-6">
          {/* رقم الارضي */}
          <div className="relative">
            <input
              type="number"
              value={landline}
              onChange={(e) => setLandline(e.target.value)}
              className="peer h-12 w-full text-base text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none"
              required
            />
            <label
              className={`absolute text-sm text-gray-500 left-0 top-3 transform transition-all duration-300 
              ${
                landline
                  ? "-translate-y-6 scale-75 text-blue-600"
                  : "translate-y-0 scale-100"
              }`}
            >
              رقم الارضي
            </label>
          </div>

          {/* الشركة */}
          <div className="relative">
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="peer h-12 w-full appearance-none text-base text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none"
              required
            >
              <option value="" disabled hidden></option>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
            <label
              className={`absolute text-sm text-gray-500 left-0 top-3 transform transition-all duration-300 
              ${
                selectedCompany
                  ? "-translate-y-6 scale-75 text-blue-600"
                  : "translate-y-0 scale-100"
              }`}
            >
              الشركة
            </label>
          </div>

          {/* السرعة */}
          <div className="relative">
            <select
              value={selectedSpeed}
              onChange={(e) => setSelectedSpeed(e.target.value)}
              className="peer h-12 w-full appearance-none text-base text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none"
              required
            >
              <option value="" disabled hidden></option>
              {speeds.map((speed) => (
                <option key={speed} value={speed}>
                  {speed}
                </option>
              ))}
            </select>
            <label
              className={`absolute text-sm text-gray-500 left-0 top-3 transform transition-all duration-300 
              ${
                selectedSpeed
                  ? "-translate-y-6 scale-75 text-blue-600"
                  : "translate-y-0 scale-100"
              }`}
            >
              اختر الباقة
            </label>
          </div>

          {/* المبالغ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* المبلغ المراد تسديده */}
            <div className="relative">
              <input
                type="number"
                value={amountToPay}
                onChange={(e) => setAmountToPay(e.target.value)}
                className="peer h-12 w-full text-base text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none"
                required
              />
              <label
                className={`absolute text-sm text-gray-500 left-0 top-3 transform transition-all duration-300 
                ${
                  amountToPay
                    ? "-translate-y-6 scale-75 text-blue-600"
                    : "translate-y-0 scale-100"
                }`}
              >
                المبلغ المراد تسديده
              </label>
            </div>

            {/* المبلغ المطلوب */}
            <div className="relative">
              <input
                type="number"
                value={calculatedAmount}
                readOnly
                className="peer h-12 w-full text-base text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-blue-600 outline-none"
              />
              <label
                className={`absolute text-sm text-gray-500 left-0 top-3 transform transition-all duration-300 
                ${
                  calculatedAmount
                    ? "-translate-y-6 scale-75 text-blue-600"
                    : "translate-y-0 scale-100"
                }`}
              >
                المبلغ المطلوب
              </label>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full font-semibold py-2.5 rounded-lg transition 
    ${
      isFormValid
        ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
          >
            تسديد الفاتورة
          </button>
        </form>
      </div>
    </div>
  );
}
