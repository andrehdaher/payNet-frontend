import React, { useEffect, useState } from "react";
import Navbar from "../components/NavbarAdmin";
import axios from "axios";

export default function PaymentStatement() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmedPayments, setConfirmedPayments] = useState({});

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/saveBalance/all-admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPayments(res.data);
      } catch (error) {
        console.error("فشل في جلب الدفعات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const confirmPaymentInBackend = async (payment) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/admin/confirm-payment",
        {
          email: payment.name, // أو يمكن تغيير الحقل حسب اسم الحقل الحقيقي للبريد
          amount: payment.amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.error("فشل تأكيد الدفعة:", error);
      alert("حدث خطأ أثناء تأكيد الدفعة.");
    }
  };

  const handleConfirm = async (payment, index) => {
    const confirmed = window.confirm("هل أنت متأكد من تعبئة الدفعة؟");
    if (!confirmed) return;

    const result = await confirmPaymentInBackend(payment);
  if (result?.success) {
  setPayments((prev) =>
    prev.map((p, i) =>
      i === index ? { ...p, isConfirmed: true } : p
    )
  );
}

  };

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen" dir="rtl">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          البيان المالي للدفعات
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">جاري تحميل البيانات...</p>
        ) : payments.length === 0 ? (
          <p className="text-center text-gray-500">لا توجد دفعات محفوظة.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3">الاسم</th>
                  <th className="p-3">الجهة</th>
                  <th className="p-3">الرقم</th>
                  <th className="p-3">صاحب العملية</th>
                  <th className="p-3">رقم الإشعار</th>
                  <th className="p-3">المبلغ</th>
                  <th className="p-3">التاريخ</th>
                  <th className="p-3">الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={index}
                    className="text-center border-b hover:bg-gray-100"
                  >
                    <td className="p-3">{payment.name}</td>
                    <td className="p-3">{payment.destination}</td>
                    <td className="p-3">{payment.number}</td>
                    <td className="p-3">{payment.operator}</td>
                    <td className="p-3">{payment.noticeNumber}</td>
                    <td className="p-3">{payment.amount}</td>
                    <td className="p-3">{payment.date?.substring(0, 10)}</td>
                    <td className="p-3">
                    <button
        onClick={() => handleConfirm(payment, index)}
        disabled={payment.isConfirmed}
        className={`px-3 py-1 rounded text-white font-medium ${
          payment.isConfirmed ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {payment.isConfirmed ? "تم التأكيد" : "تأكيد"}
      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
