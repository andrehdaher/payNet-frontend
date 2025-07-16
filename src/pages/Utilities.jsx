import React from 'react';
import CardComponent from '../components/CardComponent ';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Utilities = () => {
    const navigate = useNavigate();

    const handleBuyelectric = () => {
      navigate('/payElectric')
  
    };
  const handleBuywater = () => {
    navigate('/payWater')

  };

  return (
    <div>
            <NavBar/>

      <div className="flex flex-col items-center gap-10 p-10 min-h-screen bg-blue-50">
        {/* الأزرق الفاتح جداً */}
        <CardComponent
          title="تسديد فاتورة كهرباء"
          description="تسديد الكهرباء في جميع المحافظات"
          buttonText="تسديد فاتورة"
          onClick={handleBuyelectric}
        />
        <CardComponent
          title="تسديد فاتورة المياه"
          description="تسديد فاتورة المياه في جميع المحافظات"
          buttonText="تسديد فاتورة"
          onClick={handleBuywater}
        />
      
  
      </div>
    </div>
  );
};

export default Utilities;