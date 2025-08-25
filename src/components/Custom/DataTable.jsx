import React from "react";

export default function DataTable({
  columns = [],
  data = [],
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
}) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-center">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 transition text-center"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {typeof col.render === "function"
                      ? col.render(row)
                      : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-6 text-gray-500 text-center"
              >
                لا توجد بيانات
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 py-3">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            السابق
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
}
