import ServiceCard from "../components/Card";
import { useNavigate } from "react-router-dom";
import HARAM from "../assets/HARAM.png"
import SHAMKASH from "../assets/SHAMKASH.png"
import FOAD from "../assets/FOAD.png"
import NavBar from '../components/NavBar'
import React, { useEffect, useState , useRef } from "react";



const Balance = () => {
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

  const services = [
    {
      title: "شركة الهرم",
      description: "يمكنك الحصول على معلومات التحويل من هنا",
      image: HARAM,
      buttonText: "تعبئة رصيد",
      route: "/haram",
    },
    {
      title: "شام كاش",
      description: "تعبئة رصيد عن طريق شام كاش",
      image: SHAMKASH,
      buttonText: "تعبئة رصيد",
      route: "/shamcash",
    },
    {
      title: "شركة الفؤاد",
      description: "يمكنك االحصول على معلومات التحويل من هنا",
      image: FOAD,
      buttonText: "تعبئة رصيد",
      route: "/foad",
    },

  ];

  return (
    
    
    <div ref={vantaRef} className="min-h-screen w-full text-white relative">
        <NavBar/>
      <div  className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center"

       dir="rtl">

        {services.map((service, idx) => (
          <ServiceCard
            key={idx}
            title={service.title}
            description={service.description}
            image={service.image}
            buttonText={service.buttonText}
            onClick={() => navigate(service.route)}
          />
        ))}
      </div>
</div>
  );
};

export default Balance;
