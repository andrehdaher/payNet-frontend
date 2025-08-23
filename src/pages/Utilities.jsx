import React  from  'react';
import CardComponent from '../components/CardComponent ';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import elictric from '../assets/electric.png'
import water from '../assets/water.png'
import { useEffect, useRef, useState } from 'react';

const Utilities = () => {
  
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

    const handleBuyelectric = () => {
      navigate('/payElectric')
  
    };
  const handleBuywater = () => {
    navigate('/payWater')

  };

  return (
    <div>
            <NavBar/>

      <div ref={vantaRef} className="flex flex-col items-center gap-10 p-10 min-h-screen bg-blue-50">
        {/* الأزرق الفاتح جداً */}
        <CardComponent
          title="تسديد فاتورة كهرباء"
          description="تسديد فاتورة الكهرباء في جميع المحافظات"
          buttonText="تسديد فاتورة"
          image={elictric}
          onClick={handleBuyelectric}
        />
        <CardComponent
          title="تسديد فاتورة المياه"
          description="تسديد فاتورة المياه في جميع المحافظات"
          buttonText="تسديد فاتورة"
          onClick={handleBuywater}
          image={water}
        />
      
  
      </div>
    </div>
  );
};

export default Utilities;