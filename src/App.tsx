import { Navigate, Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/login/AdminLogin";
import MerchantLogin from "./pages/login/MerchantLogin";
import MemberLogin from "./pages/login/MemberLogin";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import MerchantDashboard from "./pages/dashboard/MerchantDashboard";
import MemberDashboard from "./pages/dashboard/MemberDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import TopNav from "./components/TopNav";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <div className="mx-auto max-w-7xl p-4">
        <Routes>
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/login/merchant" element={<MerchantLogin />} />
          <Route path="/login/member" element={<MemberLogin />} />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/merchant"
            element={
              <ProtectedRoute allowedRoles={["merchant"]}>
                <MerchantDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/member"
            element={
              <ProtectedRoute allowedRoles={["member"]}>
                <MemberDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login/admin" replace />} />
          <Route path="*" element={<div className="p-6">Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
}
