import React, { useState , useEffect , useRef} from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import InternetPaymentForm from "../components/InternetPaymentForm";
export default function PayInternet() {
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
  const [selectedSpeed, setSelectedSpeed] = useState(5);
  const [amountToPay, setAmountToPay] = useState("");
    const [paymentType, setPaymentType] = useState("cash"); 

  const calculatedAmount = amountToPay ? (amountToPay * 1.05).toFixed(2) : "";
  const isFormValid =
    landline && selectedCompany && selectedSpeed && amountToPay;


  const companies = [
    "",
    "تسديد ارضي فقط",
    "تسديد انترنت بريد فقط",
    "تسديد ارضي + انترنت بريد",
  
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
       // التوكن غير صالح، نسجل الخروج
      localStorage.removeItem('token'); // أو حسب تخزينك للتوكن
      window.location.href = '/login'; // إعادة توجيه لصفحة تسجيل الدخول
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div ref={vantaRef}>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center p-4">
        <InternetPaymentForm
          landline={landline}
          setLandline={setLandline}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          selectedSpeed={selectedSpeed}
          setSelectedSpeed={setSelectedSpeed}
          amountToPay={amountToPay}
          setAmountToPay={setAmountToPay}
          calculatedAmount={calculatedAmount}
          companies={companies}
          isFormValid={isFormValid}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          landNumber={"رقم الارضي"}
          selectCompany="اختر نوع التسديد"
            paymentType={paymentType}   
          setPaymentType={setPaymentType} 
        />
      </div>
    </div>
  );
}