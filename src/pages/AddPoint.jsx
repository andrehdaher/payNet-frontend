import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/NavBar";
import AddPointForm from "../components/AddPointForm";
import axios from "axios";

export default function AddPoint() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState("");
  const [AddPointFormId, setAddPointFormId] = useState(false);

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = parseJwt(token);
    if (decoded?.email) setEmail(decoded.email);
  }, []);

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

  const getPoint = async () => {
      const token = localStorage.getItem("token");
  if (!token) return;

  const decoded = parseJwt(token);
  if (!decoded?.email) return;

  const userEmail = decoded.email;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/point/add-point?email=${userEmail}`
      );
      console.log(res.data);
      setFormData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPoint();
  }, []);

  // ✅ إضافة رصيد
  const handelAddBalance = async (id , username , owner) => {
    const amount = prompt("ادخل قيمة الرصيد المطلوب إضافتها:");
    if (!amount) return;
    try {
      await axios.put(`http://localhost:5000/api/point/add-balance/${id}`, {
        amount,
        email,
        username,
        owner,
      });
      alert("تمت إضافة الرصيد بنجاح ✅");
      window.location.reload(); // هذه الطريقة صحيحة
      // إعادة تحميل النقاط بعد التعديل
    } catch (err) {
      console.log(err);
      alert("حدث خطأ أثناء إضافة الرصيد ❌");
    }
  };

  // ✅ حذف نقطة
  const handelDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من الحذف؟")) return;
    try {
      await axios.delete(`http://localhost:5000/api/point/delete/${id}`);
      alert("تم حذف النقطة ✅");
      getPoint();

      // إعادة تحميل النقاط بعد الحذف
    } catch (err) {
      console.log(err);
      alert("حدث خطأ أثناء الحذف ❌");
    }
  };

  return (
    <div ref={vantaRef} className="min-h-screen ">
      {AddPointFormId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <AddPointForm onClose={() => setAddPointFormId(false)} />
        </div>
      )}
      <Navbar />

      <div className="flex flex-col justify-center items-center min-h-[80vh] px-4">
        <div className="shadow-md rounded-lg bg-white overflow-x-auto w-full">
          <table className="min-w-full text-xl text-center text-black">
            <thead className="bg-violet-600 text-white">
              <tr>
                <th className="py-3 px-4">العمليات </th>
                <th className="py-3 px-4">تاريخ الانشاء </th>
                <th className="py-3 px-4">الرصيد </th>
                <th className="py-3 px-4">الوكيل </th>
                <th className="py-3 px-4">اسم المستخدم </th>
                <th className="py-3 px-4">صاحب النقطة </th>
              </tr>
            </thead>
            <tbody className="border-b bg-gray-100 hover:bg-gray-300 transition">
              {formData.length > 0 ? (
                formData.map((p) => (
                  <tr key={p._id}>
                    <td className="py-3 px-4 flex justify-center gap-2">
                      <button
                        onClick={() => handelAddBalance(p._id , p.username , p.owner)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        إضافة رصيد
                      </button>
                      <button
                        onClick={() => handelDelete(p._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        حذف
                      </button>
                    </td>
                    <td className="py-3 px-4">{p.createdAt} </td>
                    <td className="py-3 px-4">{p.balance} </td>
                    <td className="py-3 px-4"> {p.email} </td>
                    <td className="py-3 px-4"> {p.username} </td>
                    <td className="py-3 px-4"> {p.owner} </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-6 text-gray-500">
                    لا يوجد نقاط فرعية حتى الآن
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ✅ زر إضافة نقطة خارج وأسفل الجدول */}
        <div className="mt-6">
          <button
            onClick={() => setAddPointFormId(true)}
            className="bg-violet-600 text-white px-6 py-2 rounded shadow hover:bg-violet-700 transition"
          >
            إضافة نقطة
          </button>
        </div>
      </div>
    </div>
  );
}
