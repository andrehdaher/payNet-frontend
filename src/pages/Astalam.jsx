import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/NavBar";
import { io } from "socket.io-client";

export default function Astalam() {
  const vantaRef = useRef(null);
  const socketRef = useRef(null); // لتخزين اتصال socket

  const [vantaEffect, setVantaEffect] = useState(null);
  const [astalam, setastalam] = useState(false);
  const [fatora, setfatora] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [landline, setLandline] = useState("");
  const [fatoraData, setFatoraData] = useState(null);
  const [countdown, setCountdown] = useState(30);
  const [loading, setLoading] = useState(true);

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  const token = localStorage.getItem("token");
  const decoded = parseJwt(token);
  const email = decoded?.email;

  // العد التنازلي
  useEffect(() => {
    if (fatora && fatoraData) {
      setLoading(true);
      setCountdown(10);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setLoading(false);
            setastalam(false); // إعادة تفعيل الزر

            return 0;
          }
          return prev - 1; // ينقص ثانية واحدة
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [fatora, fatoraData]);

  // تأثير الخلفية
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

  // الاتصال بالسيرفر
  useEffect(() => {
    if (!email) return;

    const socket = io("https://daherserver-zgmy.onrender.com");
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ متصل بالسيرفر");
      socket.emit("register", email);
      console.log(email);
    });

    socket.on("json_message", (data) => {
      console.log("📩 استلمت JSON:", data);

      try {
        let parsedData;

        if (typeof data.content.data === "string") {
          parsedData = JSON.parse(data.content.data);
        } else {
          parsedData = data.content.data;
        }

        setFatoraData(parsedData);
        setfatora(true);
      } catch (error) {
        console.error("❌ خطأ في تحليل JSON:", error);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [email]);

  // دالة الاستعلام
  const handelAstalam = () => {
    if (!selectedCompany || !landline) {
      alert("يرجى اختيار الشركة وإدخال الرقم الأرضي");
      return;
    }
    if (socketRef.current) {
      socketRef.current.emit("json_message", {
        target: "worker",
        content: { email, selectedCompany, landline },
      });
    }

    setastalam(true);
    setFatoraData(null);
    setfatora(false);
    setLoading(true);
  };

  const companies = [
    "",
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

  return (
    <div ref={vantaRef} className="min-h-screen flex flex-col">
      {/* الهيدر */}
      <Navbar />

      {/* المحتوى */}
      <main className="flex-1 relative z-10 flex flex-col items-center">
        <h1 className="text-3xl py-2 text-black">استعلام عن فاتورة</h1>

        <div
          className="grid gap-6 p-16 sm:grid-cols-1 lg:grid-cols-1 place-items-center bg-slate-700 rounded-xl"
          dir="rtl"
        >
          <h1 className="text-white">اختر الشركة</h1>
          <select
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="peer h-12 w-full text-white text-xl px-4 bg-transparent border-2 rounded-xl border-gray-300 focus:border-blue-600 outline-none "
            required
          >
            <option value="" disabled hidden></option>
            {companies.map((company) => (
              <option className="bg-white text-black" key={company} value={company}>
                {company}
              </option>
            ))}
          </select>

          <h1 className="text-white">رقم الارضي</h1>
          <input
            onChange={(e) => setLandline(e.target.value)}
            className="peer h-12 w-full text-white text-xl px-4 bg-transparent border-2 rounded-xl border-gray-300 focus:border-blue-600 outline-none"
            required
            type="text"
          />

          <button
            onClick={handelAstalam}
            className={`text-white w-full py-2.5 rounded-lg ${
              astalam ? "bg-violet-950" : "bg-violet-600 hover:bg-violet-700"
            }`}
          >
            {astalam ? "جاري الاستعلام . . ." : "استعلام عن فاتورة"}
          </button>

          <h1 className="text-xl text-red-500">
            {astalam ? (
              <>
                الرجاء عدم مغادرة الصفحة <br />
                المدة المتوقعة 60 ثانية
              </>
            ) : (
              ""
            )}
          </h1>
        </div>

        {/* الفاتورة */}
        <div
          className={`${
            fatora
              ? "max-w-md w-full mx-auto text-black place-items-center p-4 my-3 rounded-lg bg-gray-300 overflow-y-auto max-h-80"
              : "hidden"
          }`}
        >
          {loading ? (
            <h1>الرجاء الانتظار... {countdown} ثانية</h1>
          ) : fatoraData ? (
            <>
              {Object.entries(fatoraData).map(([key, value]) => (
                <h1 key={key}>
                  {key}: {value}
                </h1>
              ))}
            </>
          ) : (
            <h1>لا توجد بيانات</h1>
          )}
        </div>
      </main>

      {/* الفوتر */}
      <footer className="bg-gray-800 text-white text-center p-4">
        هذا الفوتر
      </footer>
    </div>
  );
}
