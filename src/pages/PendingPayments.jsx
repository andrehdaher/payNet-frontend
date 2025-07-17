import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";

export default function PendingPayments() {
  const [pendingPayments, setPendingPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // فلاتر البحث
  const [searchDate, setSearchDate] = useState("");
  const [searchLandline, setSearchLandline] = useState("");

  useEffect(() => {
    fetchPending();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // عند تغيير الفلاتر نبدأ من الصفحة الأولى
  }, [searchLandline, searchDate]);

  const fetchPending = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://paynet-cdji.onrender.com/api/admin/user/pending", // نفس API البيان المالي
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // تصفية البيانات داخل الـ useEffect
      const filtered = res.data.filter((p) => p.status === "جاري التسديد");
      setPendingPayments(filtered);
    } catch (err) {
      console.error("فشل في جلب البيانات:", err);
    }
  };

  // تصفية حسب البحث
  const filteredPayments = pendingPayments.filter((p) => {
    const landlineMatch = p.landline.includes(searchLandline);
    const dateMatch = searchDate
      ? new Date(p.updatedAt || p.createdAt)
          .toISOString()
          .split("T")[0] === searchDate
      : true;

    return landlineMatch && dateMatch;
  });

  // حساب بيانات الصفحة الحالية
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">
          عمليات قيد التسديد
        </h2>

        {/* واجهة البحث */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="بحث برقم الهاتف الأرضي"
            className="border p-2 rounded"
            value={searchLandline}
            onChange={(e) => setSearchLandline(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto shadow-md rounded-lg bg-white">
          <table className="min-w-full text-sm text-center text-gray-700">
            <thead className="bg-yellow-600 text-white">
              <tr>
                <th className="py-3 px-4">رقم أرضي</th>
                <th className="py-3 px-4">الشركة</th>
                <th className="py-3 px-4">السرعة</th>
                <th className="py-3 px-4">المبلغ</th>
                <th className="py-3 px-4">تاريخ الطلب</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="py-3 px-4">{p.landline}</td>
                    <td className="py-3 px-4">{p.company}</td>
                    <td className="py-3 px-4">{p.speed}</td>
                    <td className="py-3 px-4">
                      {p.amount.toLocaleString()} ل.س
                    </td>
                    <td className="py-3 px-4">
                      {new Date(p.createdAt).toLocaleString("ar-SY", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-6 text-gray-500">
                    لا توجد عمليات قيد التسديد حاليًا.
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
                    ? "bg-yellow-600 text-white"
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
