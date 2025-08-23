import React, { useState ,useEffect , useRef } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";

export default function PayElectric() {

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

  const [landline, setLandline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedSpeed, setSelectedSpeed] = useState("");
  const [amountToPay, setAmountToPay] = useState("");
    const [paymentType, setPaymentType] = useState("cash"); 

  const calculatedAmount = amountToPay ? (amountToPay * 1.05).toFixed(2) : "";
  const isFormValid =
    landline && selectedCompany && selectedSpeed && amountToPay;

  const companies = [
    "",
    "حماة-مياه",
    "حمص-مياه",
    "دمشق-مياه",
    "ريف دمشق-مياه",
    "السويداء-مياه",
    "درعا-مياه",
    "القنيطرة-مياه",
    "اللاذقية-مياه",
    "طرطوس-مياه",
    "دير الزور-مياه",
    "حلب-مياه",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    const decoded = parseJwt(token);
    const email = decoded?.email;

    try {
      const res = await axios.post(
        "https://paynet-1.onrender.com/api/payment/internet-full",
        {
          landline,
          company: selectedCompany,
          speed: selectedSpeed,
          amount: parseFloat(amountToPay),
          email,
          paymentType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("تم التسديد بنجاح. الرصيد الجديد: " + res.data.newBalance);

      // إعادة تعيين الحقول
      setLandline("");
      setSelectedCompany("");
      setSelectedSpeed("");
      setAmountToPay("");

      // إعادة تحميل الصفحة أو تحديث الحالة حسب الحاجة
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "حدث خطأ");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <NavBar />

      <div ref={vantaRef} className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
        <form         className="w-full max-w-md bg-slate-700 shadow-md rounded-xl p-6 space-y-6">
          {/* الشركة */}
          <div className="relative">
            <h1 className="text-white px-3 my-2">اختر المحافظة </h1>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
            className="peer h-12 w-full text-white   bg-transparent border-2 text-xl px-4  border-gray-300 focus:border-blue-600 rounded-xl outline-none"
              required
            >
              <option value="" disabled hidden></option>
              {companies.map((company) => (
                <option className="bg-[#000000af]" key={company} value={company}>
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
            </label>
          </div>
          {/* رقم الباركود */}
          <div className="relative">
            <h1 className="text-white px-3 my-2">رقم الباركود</h1>
            <input
              type="number"
              value={landline}
              onChange={(e) => setLandline(e.target.value)}
            className="peer h-12 w-full  text-white bg-transparent border-2 text-xl px-4 rounded-xl border-gray-300 focus:border-blue-600 rounded-xl outline-none"
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
            </label>
          </div>

          {/* رقم الاشتراك */}
          <div className="relative">
            <h1 className="text-white px-3 my-2"> رقم العداد</h1>
            <input
              type="number"
              value={selectedSpeed}
              onChange={(e) => setSelectedSpeed(e.target.value)}
            className="peer h-12 w-full  text-white bg-transparent border-2 text-xl px-4 rounded-xl border-gray-300 focus:border-blue-600 rounded-xl outline-none"
              required
            />
            <label
              className={`absolute text-sm text-gray-500 left-0 top-3 transform transition-all duration-300 
              ${
                selectedSpeed
                  ? "-translate-y-6 scale-75 text-blue-600"
                  : "translate-y-0 scale-100"
              }`}
            >
            </label>
          </div>

          {/* المبالغ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* المبلغ المراد تسديده */}
            <div className="relative">
              <h1 className="text-white px-3 my-2">المبلغ المراد تسديده</h1>
              <input
                type="number"
                value={amountToPay}
                onChange={(e) => setAmountToPay(e.target.value)}
            className="peer h-12 w-full  text-white bg-transparent border-2 text-xl px-4 rounded-xl border-gray-300 focus:border-blue-600 rounded-xl outline-none"
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
              </label>
            </div>

            {/* المبلغ المطلوب */}
            <div className="relative">
              <h1 className="text-white px-3 my-2">المبلغ المطلوب</h1>
              <input
                type="number"
                value={calculatedAmount}
                readOnly
            className="peer h-12 w-full  text-white bg-transparent border-2 text-xl px-4 rounded-xl border-gray-300 focus:border-blue-600 rounded-xl outline-none"
              />
              <label
                className={`absolute text-sm text-gray-500 left-0 top-3 transform transition-all duration-300 
                ${
                  calculatedAmount
                    ? "-translate-y-6 scale-75 text-blue-600"
                    : "translate-y-0 scale-100"
                }`}
              >
              </label>
            </div>
          </div>
                        {/* نوع الدفع */}
        <div className="text-white px-3 my-2">
          <h1 className="mb-2">نوع الدفع</h1>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentType"
                value="cash"
                checked={paymentType === "cash"}
                onChange={(e) => setPaymentType(e.target.value)}
              />
              نقداً
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentType"
                value="credit"
                checked={paymentType === "credit"}
                onChange={(e) => setPaymentType(e.target.value)}
              />
              دين
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
        ? "bg-violet-600 hover:bg-violet-700 text-white cursor-pointer"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
          >
            {isSubmitting ? "جاري التسديد..." : "تسديد الفاتورة"}
          </button>
        </form>
      </div>
    </div>
  );
}
