import ServiceCard from "../components/Card";
import { useNavigate } from "react-router-dom";
import HARAM from "../assets/HARAM.png"
import SHAMKASH from "../assets/SHAMKASH.png"
import FOAD from "../assets/FOAD.png"
import NavBar from '../components/NavBar'


const Balance = () => {

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
    
    
<div className="bg-blue-50 min-h-screen">
        <NavBar/>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6" dir="rtl">

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
