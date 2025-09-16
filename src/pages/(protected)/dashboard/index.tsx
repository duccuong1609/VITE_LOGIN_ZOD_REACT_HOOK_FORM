import { AuthContext } from "@/layout/AuthProvider";
import { useContext } from "react";
import UserInfoCard from "@/apps/dashboard/components/UserInfoCard";

const Dashboard = () => {
  const authState = useContext(AuthContext);
  const isLoading = authState?.isLoading ?? false;
  const user = authState?.currentUser;

  return (
    <>
      <title>Dashboard</title>
      {user && (
        <UserInfoCard
          isLoading={isLoading}
          user={user}
          logout={authState?.logout}
        />
      )}
    </>
  );
};

export default Dashboard;