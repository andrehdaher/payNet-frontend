import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  const payload = JSON.parse(atob(token.split(".")[1]));

  // ✅ تحقق من الدور إذا كان مطلوبًا
  if (allowedRoles && !allowedRoles.includes(payload.role)) {
    return <Navigate to="/login" />; // أو صفحة غير مصرح بها
  }

  return children;
}
