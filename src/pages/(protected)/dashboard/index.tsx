import { AuthContext } from "@/layout/AuthProvider";
import { useContext } from "react";
import UserInfoCard from "@/apps/dashboard/components/UserInfoCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const authState = useContext(AuthContext);
  const isLoading = authState?.isLoading ?? false;
  const user = authState?.currentUser;
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);

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
      <div className="flex gap-2 w-full items-center justify-center mt-4">
        {numbers.map((item, index) => (
          <Link to={`/user/${item}`} key={index}>
            <Button className="text-white">{item}</Button>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
