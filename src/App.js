import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Balance from "./pages/Balance";
import FinancialStatement from "./pages/FinancialStatement";
import PendingPayments from "./pages/PendingPayments";
import Internet from "./pages/Internet";
import PayInternet from "./pages/PayInternet";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPending from './pages/AdminPending'
import Recharge from './pages/Recharge'
import PayIptv from "./pages/PayIptv";
import Phone from "./pages/Phone";
import PayPhone from "./pages/PayPhone";
import Utilities from "./pages/Utilities";
import PayElectric from "./pages/PayElectric";
import PayWater from "./pages/PayWater";
import Haram from "./pages/Haram";
import ShamCash from "./pages/ShamCash";
import Foad from "./pages/Foad";
import PaymentStatement from "./pages/PaymentStatement";
import AutoLogout from "./hooks/AutoLogout"; // أو المسار الصحيح
import AdminPaymentStatement from './pages/AdminPaymentStatement'
import Adminadminfinancial from './pages/Adminfinancial'



function App() {
  return (
    <BrowserRouter>
          <AutoLogout />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/internet"
          element={
            <ProtectedRoute>
              <Internet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/balance"
          element={
            <ProtectedRoute>
              <Balance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/financial"
          element={
            <ProtectedRoute>
              <FinancialStatement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pending"
          element={
            <ProtectedRoute>
              <PendingPayments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payinternet"
          element={
            <ProtectedRoute>
              <PayInternet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminpending"
          element={
    <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPending />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminPaymentStatement"
          element={
    <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPaymentStatement/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminfinancial"
          element={
    <ProtectedRoute allowedRoles={["admin"]}>
              <Adminadminfinancial/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/recharge"
          element={
            <ProtectedRoute>
              <Recharge />
            </ProtectedRoute>
          }
        />
        <Route
          path="/iptv"
          element={
            <ProtectedRoute>
              <PayIptv />
            </ProtectedRoute>
          }
        />
        <Route
          path="/phone"
          element={
            <ProtectedRoute>
              <Phone />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payPhone"
          element={
            <ProtectedRoute>
              <PayPhone />
            </ProtectedRoute>
          }
        />
    
        <Route
          path="/utilities"
          element={
            <ProtectedRoute>
              <Utilities />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payElectric"
          element={
            <ProtectedRoute>
              <PayElectric />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payWater"
          element={
            <ProtectedRoute>
              <PayWater />
            </ProtectedRoute>
          }
        />
        <Route
          path="/haram"
          element={
            <ProtectedRoute>
              <Haram />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shamcash"
          element={
            <ProtectedRoute>
              <ShamCash />
            </ProtectedRoute>
          }
        />
        <Route
          path="/foad"
          element={
            <ProtectedRoute>
              <Foad/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/PaymentStatement"
          element={
            <ProtectedRoute>
              <PaymentStatement/>
            </ProtectedRoute>
          }
        />
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
