import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";
import { useNotification } from "../context/NotificationContext";



export default function FinancialStatement() {
  const [confirmedPayments, setConfirmedPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // فلاتر البحث
  const [searchDate, setSearchDate] = useState("");
  const [searchLandline, setSearchLandline] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const vantaRef = useRef(null);
      const {hasNewUnpaid, setHasNewUnpaid } = useNotification(); // ✅ Context
  
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

  useEffect(() => {
    fetchConfirmed();
  }, []);

  useEffect(() => {
    // عند تغيير البحث نعود للصفحة الأولى
    setCurrentPage(1);
  }, [searchLandline, searchDate, searchStatus, paymentFilter]);

  const fetchConfirmed = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/admin/user/confirmed",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setConfirmedPayments(res.data);
      setHasNewUnpaid(false);

    } catch (err) {
      console.error("فشل في جلب البيانات:", err);
    }
  };

  const handlePaymentTypeChange = async (id, newType) => {
    const confirm = window.confirm("هل انت متاكد من تعديل نوع الدفع")
    if(!confirm) return
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/payment/${id}`,
        { paymentType: newType },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // تحديث الحالة محلياً بدون إعادة تحميل
      setConfirmedPayments((prev) =>
        prev.map((p) => (p._id === id ? { ...p, paymentType: newType } : p))
      );
    } catch (err) {
      console.error("فشل في تعديل نوع الدفع:", err);
      alert("حدث خطأ أثناء تعديل نوع الدفع");
    }
  };

  // تصفية البيانات حسب الفلاتر
  const filteredPayments = confirmedPayments.filter((p) => {
    const landlineMatch = p.landline.includes(searchLandline);
    const statusMatch = searchStatus ? p.status === searchStatus : true;
    const statusPayment = paymentFilter
      ? p.paymentType === paymentFilter
      : true;
    const dateMatch = searchDate
      ? new Date(p.updatedAt || p.createdAt).toISOString().split("T")[0] ===
        searchDate
      : true;

    return landlineMatch && statusMatch && dateMatch && statusPayment;
  });

  // حساب الصفحات الحالية بعد التصفية
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPayments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div ref={vantaRef} className="min-h-screen bg-gray-50 my-2">
      <Navbar  />

      <div className="p-6 w-full mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
          البيان المالي
        </h2>

        {/* واجهة البحث */}
        <div className="grid grid-cols-1  md:grid-cols-4 gap-4 mb-6 ">
          <input
            type="text"
            placeholder="بحث برقم الهاتف الأرضي"
            className="p-2 border bg-[#00000045] placeholder:text-white text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-none text-base"
            value={searchLandline}
            onChange={(e) => setSearchLandline(e.target.value)}
          />
          <input
            type="date"
            className="p-2 border bg-[#00000045] placeholder:text-white text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-none text-base"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <select
            className="p-2 border bg-[#00000045] placeholder:text-white text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-none text-base"
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
          >
            <option value="">كل الحالات</option>
            <option value="تم التسديد">تم التسديد</option>
            <option value="غير مسددة">غير مسددة</option>
          </select>
          <select
            className="p-2 border bg-[#00000045] placeholder:text-white text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-none text-base"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="">كل الحالات</option>
            <option value="cash">نقداً</option>
            <option value="credit">دين</option>
          </select>
        </div>

        <div className=" shadow-md rounded-lg bg-white">
          <table className="min-w-full text-xl text-center text-black">
            <thead className="bg-violet-600 text-white">
              <tr>
                <th className="py-3 px-4">رقم أرضي</th>
                <th className="py-3 px-4">الشركة</th>
                <th className="py-3 px-4">السرعة</th>
                <th className="py-3 px-4">المبلغ</th>
                <th className="py-3 px-4">نوع الدفع</th>
                <th className="py-3 px-4">الحالة</th>
                <th className="py-3 px-4">تاريخ التسديد</th>
                <th className="py-3 px-4">ملاحظات</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((p) => (
                  <tr
                    key={p._id}
                          className={`${p.paymentType === "credit"
                      ? "border-b bg-red-500 hover:bg-red-700 transition"
                      : "border-b bg-gray-100 hover:bg-gray-300 transition"
                    }`}
                  >
                    <td className="py-3 px-4">{p.landline}</td>
                    <td className="py-3 px-4">{p.company}</td>
                    <td className="py-3 px-4">{p.speed}</td>
                    <td className="py-3 px-4">
                      {p.amount.toLocaleString()} ل.س
                    </td>
                    {/* نوع الدفع - قابل للتعديل */}
                    <td className="py-3 px-4">
                      <select
                        value={p.paymentType || ""}
                        onChange={(e) =>
                          handlePaymentTypeChange(p._id, e.target.value)
                        }
                        className="border rounded p-1 bg-white  text-sm"
                      >
                        <option value="cash">نقداً</option>
                        <option value="credit">دين</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs text-black font-semibold ${
                          p.status === "تم التسديد"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(p.updatedAt || p.createdAt).toLocaleString(
                        "ar-SY",
                        {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {p.status === "غير مسددة" ? p.note || "—" : "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-6 text-gray-500">
                    لا توجد عمليات في البيان المالي حتى الآن.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* أزرار التنقل بين الصفحات */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
