import React , {useRef , useEffect , useState} from 'react';
import CardComponent from '../components/CardComponent ';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ADSL from '../assets/tasded.png'
import astalam from '../assets/astalam.png'

const Phone = () => {
  
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

  const handleBuy = () => {
    navigate('/payPhone')

  };

  return (
    <div >
            <NavBar/>

      <div ref={vantaRef} className="flex flex-col items-center gap-10 p-10 min-h-screen text-center bg-blue-50">
        {/* الأزرق الفاتح جداً */}
        <CardComponent
          image={astalam}
          title="استعلام عن الفاتورة"
          description="استعلام عن  الفاتورة قبل التسديد"
          buttonText="استعلام عن الفاتورة"
          onClick={() => window.open('http://tarassul.sy/#BPKCMCOF', '_blank')}
        />
        <CardComponent
          image={ADSL}
          
          title="تسديد فاتورة الارضي"
          description="تسديد  فاتورة الارضي بسرعة وامان "
          buttonText="تسديد فاتورة الارضي"
          onClick={handleBuy}
        />
      
  
      </div>
    </div>
  );
};

export default Phone;