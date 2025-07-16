import React from 'react';
import CardComponent from '../components/CardComponent ';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Phone = () => {
    const navigate = useNavigate();

  const handleBuy = () => {
    navigate('/payPhone')

  };

  return (
    <div>
            <NavBar/>

      <div className="flex flex-col items-center gap-10 p-10 min-h-screen bg-blue-50">
        {/* الأزرق الفاتح جداً */}
        <CardComponent
          title="استعلام عن الفاتورة"
          description="استعلام عن قيمة الفاتورة قبل التسديد"
          buttonText="استعلام عن الفاتورة"
          onClick={() => window.open('http://tarassul.sy/#BPKCMCOF', '_blank')}
        />
        <CardComponent
          title="تسديد فاتورة"
          description="تسديد فاتورة الارضي"
          buttonText="تسديد فاتورة"
          onClick={handleBuy}
        />
      
  
      </div>
    </div>
  );
};

export default Phone;