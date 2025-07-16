import ServiceCard from "../components/Card";
import { useNavigate } from "react-router-dom";
import ADSL from "../assets/ADSL.png"
import elecandwater from "../assets/elecandwater.png"
import ARDE from "../assets/ARDE.png"
import NavBar from '../components/NavBar'

const Home = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "تسديد فواتير الإنترنت",
      description: "ادفع فواتير الإنترنت الخاصة بك بسرعة وأمان.",
      image: ADSL,
      buttonText: "سدد الآن",
      route: "/internet",
    },
    {
      title: "تسديد فواتير الارضي",
      description: "ادفع فواتير الارضي الخاصة بك بسرعة وأمان.",
      image: ARDE,
      buttonText: "سدد الآن",
      route: "/phone",
    },
    {
      title: "تسديد كهرباء ومياه",
      description: "إدارة فواتير الكهرباء والمياه بكل سهولة.",
      image: elecandwater,
      buttonText: "سدد الآن",
      route: "/utilities",
    },
    

  ];

  return (
    
    
<div className="bg-blue-50  min-h-screen">
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

export default Home;
