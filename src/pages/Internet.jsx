import React, { useEffect, useRef, useState } from "react";
import CardComponent from '../components/CardComponent ';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import tasded from "../assets/tasded.png";
import iptv from "../assets/iptv.png";
import baka from "../assets/baka.png";
import astfham from "../assets/astfham.png";

const Home = () => {
    const navigate = useNavigate();
      const vantaRef = useRef(null);
      const [vantaEffect, setVantaEffect] = useState(null);
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


  const handleBuy = () => {
    navigate('/payinternet')
    

  };

  return (
    <div ref={vantaRef} className="min-h-screen w-full text-white relative">
            <NavBar/>

    <div
          className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center"
        dir="rtl"
      >        {/* الأزرق الفاتح جداً */}
        <CardComponent
          title="تسديد فاتورة"
          description="تسديد فاتورة انترنت واضافة رصيد"
          buttonText="تسديد فاتورة"
          onClick={handleBuy}
          image={tasded}
        />
{(email === "hadi46" || email === "and" || email === "almoalm08" || email === "rafed" || email === "mazen93" || email ==="abdalkhaled27" || email ==="aesa94") && (
  <CardComponent
    title="استعلام عن فاتورة"
    description="استعلام عن قيمة فاتورة انترنت "
    buttonText="استعلام عن فاتورة"
    onClick={() => { navigate('/astalam') }}
    image={astfham}
  />
)}
        <CardComponent
          title="تسديد IPTV"
          description=" تسديد خدمة  بسرعة وامانIPTV"
          buttonText="اضافة رصيد"
          onClick={() => navigate('/iptv')}
          image={iptv}
        />
      
        <CardComponent
          title="شحن باقة"
          description="شحن باقة انترنت بسرعة وامان"
          buttonText="شحن باقة"
          onClick={() => navigate('/recharge')}
          image={baka}
        />
      </div>
    </div>
  );
};

export default Home;