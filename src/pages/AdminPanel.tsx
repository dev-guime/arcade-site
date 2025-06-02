
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminPcForm } from "@/components/admin/AdminPcForm";
import { AdminPerifericosForm } from "@/components/admin/AdminPerifericosForm";
import { ProductList } from "@/components/admin/ProductList";
import { AdminLayout } from "@/components/admin/AdminLayout";

const AdminPanel = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "pcs":
        return (
          <div className="p-6 space-y-6">
            <AdminPcForm />
            <ProductList type="pcs" />
          </div>
        );
      case "perifericos":
        return (
          <div className="p-6 space-y-6">
            <AdminPerifericosForm />
            <ProductList type="perifericos" />
          </div>
        );
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminPanel;
