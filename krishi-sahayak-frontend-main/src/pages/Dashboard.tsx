import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, LogOut, Users, User as UserIcon } from "lucide-react"; // renamed User icon
interface AppUser {
  id: string;
  username: string;
  email: string;
  role: string;
  approved?: boolean;
}

const Dashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8081/api/users/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error(t("error.fetchUser"));
      return res.json();
    },
  });

  const { data: allUsers } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8081/api/users/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error(t("error.fetchUsers"));
      return res.json();
    },
    enabled: currentUser?.role === "ROLE_ADMIN",
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`http://localhost:8081/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error(t("error.deleteUser"));
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (isLoading) return <p className="text-center mt-20">{t("loading")}...</p>;

  return (
    <div className="flex min-h-screen bg-green-50">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-green-700 text-white flex flex-col p-4 transition-all duration-300`}
      >
        {/* Toggle Button */}
        <button
          className="flex items-center gap-2 mb-8 text-white hover:text-green-200"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu size={22} />
          {!isCollapsed && <span className="font-semibold">{t("dashboard.menu")}</span>}
        </button>

        {/* User Info */}
        <div className="space-y-2 mb-6">
          {!isCollapsed ? (
            <>
              <p className="text-sm opacity-80">
                {t("dashboard.username")}: <span className="font-semibold">{currentUser.username}</span>
              </p>
              <p className="text-sm opacity-80">
                {t("dashboard.email")}: <span className="font-semibold">{currentUser.email}</span>
              </p>
              <p className="text-sm opacity-80">
                {t("dashboard.role")}: <span className="font-semibold">{currentUser.role}</span>
              </p>
            </>
          ) : (
            <UserIcon size={24} className="mx-auto" />
          )}
        </div>

        {/* Admin Navigation */}
        {currentUser?.role === "ROLE_ADMIN" && (
          <div className="mt-4">
            <button className="flex items-center gap-2 py-2 px-3 rounded hover:bg-green-600 w-full text-left">
              <Users size={20} />
              {!isCollapsed && <span>{t("dashboard.allUsers")}</span>}
            </button>
          </div>
        )}

        {/* Logout */}
        <div className="mt-auto">
          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            {!isCollapsed && <span>{t("dashboard.logout")}</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Welcome Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-green-700">
            {t("dashboard.welcome")}, {currentUser.username}! 👋
          </h2>
          <p className="text-gray-600">{t("dashboard.subtitle")}</p>
        </div>

        {/* Admin Users Section */}
        {currentUser?.role === "ROLE_ADMIN" && allUsers && (
          <div className="bg-white shadow rounded-xl p-6 border border-green-100">
            <h3 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
              <Users size={20} /> {t("dashboard.allUsers")}
            </h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 px-3 text-gray-600">Username</th>
                  <th className="py-2 px-3 text-gray-600">Email</th>
                  <th className="py-2 px-3 text-gray-600">Role</th>
                  <th className="py-2 px-3 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user: AppUser) => (
                  <tr key={user.id} className="border-b hover:bg-green-50">
                    <td className="py-2 px-3 font-medium">{user.username}</td>
                    <td className="py-2 px-3">{user.email}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          user.role === "ROLE_ADMIN"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      {user.id !== currentUser.id && (
                        <Button
                          className="bg-red-500 hover:bg-red-600 text-white text-sm"
                          onClick={() => deleteMutation.mutate(user.id)}
                        >
                          {t("dashboard.delete")}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Farmer Delete Account */}
        {currentUser?.role === "ROLE_FARMER" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-6">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              ⚠️ {t("dashboard.deleteMyAccount")}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {t("dashboard.deleteMyAccountWarning")}
            </p>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => deleteMutation.mutate(currentUser.id)}
            >
              {t("dashboard.deleteMyAccount")}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
