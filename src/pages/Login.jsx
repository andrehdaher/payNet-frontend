import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  
  

  const navigate = useNavigate();

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (isSubmitting) return;

  setIsSubmitting(true);

    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("email", res.data.email); // فقط إن كنت تستخدمه في أماكن أخرى

      const payload = parseJwt(token);

      if (payload?.role === "admin") {
        navigate("/adminpending");
      } else {
        navigate("/");
      }

      console.log("تم تسجيل الدخول:", res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول");
    }
     finally {
    setIsSubmitting(false);
  }
  };

  return (
    <div ref={vantaRef} className="min-h-screen flex items-center justify-center  px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#00000050] p-10 rounded-2xl shadow-xl w-full max-w-md space-y-5"
      >
        <h1 className="text-4xl font-bold text-center text-violet-700 mb-2 tracking-wide">
          PayNet
        </h1>
        <h2 className="text-3xl font-bold text-center text-[#ffffffd3]">
          تسجيل الدخول
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
        <h1 className="text-white">اسم المستخدم</h1>
        <input
          type="text"
          placeholder="Daher.Net"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border bg-[#00000080] text-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-none text-base"
          required
        />
        <h1 className="text-white">كلمة المرور</h1>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3  border bg-[#00000080] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-none text-base"
          required
        />
<br/>
<br/>
        <button
          type="submit"
          className="w-full bg-violet-700 text-white py-3 rounded-lg hover:bg-purple-800 transition duration-300 text-lg "
        >
  {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </form>
    </div>
  );
}
