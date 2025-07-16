import React from 'react';
import CardComponent from '../components/CardComponent ';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Home = () => {
    const navigate = useNavigate();

  const handleBuy = () => {
    navigate('/payinternet')

  };

  return (
    <div>
            <NavBar/>

      <div className="flex flex-col items-center gap-10 p-10 min-h-screen bg-blue-50">
        {/* الأزرق الفاتح جداً */}
        <CardComponent
          title="تسديد فاتورة"
          description="تسديد فاتورة انترنت واضافة رصيد"
          buttonText="تسديد فاتورة"
          onClick={handleBuy}
        />
      
        <CardComponent
          title="تسديد IPTV"
          description="تسديد خدمة IPTV"
          buttonText="اضافة رصيد"
          onClick={() => navigate('/iptv')}
        />
      
        <CardComponent
          title="شحن باقة"
          description="شحن باقة انترنت"
          buttonText="شحن باقة"
          onClick={() => navigate('/recharge')}
        />
      </div>
    </div>
  );
};

export default Home;