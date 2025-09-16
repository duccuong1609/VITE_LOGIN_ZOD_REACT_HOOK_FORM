import { AuthContext } from "@/layout/AuthProvider";
import { useContext, useEffect, useState } from "react";
import UserInfoCard from "@/apps/dashboard/components/UserInfoCard";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { UserProps } from "@/services/type";

const UserPage = () => {
  const authState = useContext(AuthContext);
  const isLoading = authState?.isLoading ?? true;
  const user = authState?.currentUser;
  const { id } = useParams();
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);
  const [pageUser, setPageUser] = useState<UserProps | null>(null);

  useEffect(() => {
    if (authState && id) {
      authState
        .handleGetUserById(id as string)
        .then((res) => {
          setPageUser(res ?? null);
        })
        .catch(() => {});
    }
  }, [id, authState?.handleGetUserById]);

  return (
    <>
      <title>UserPage</title>
      {pageUser && (
        <UserInfoCard isLoading={isLoading} user={pageUser ?? user} />
      )}
      <div className="flex gap-2 w-full items-center justify-center mt-4">
        {numbers.map((item, index) => (
          <Link to={`/user/${item}`} key={index}>
            <Button className="text-white">{item}</Button>
          </Link>
        ))}
        <Link to={`/dashboard`} >
          <Button className="text-white">Dashboard</Button>
        </Link>
      </div>
    </>
  );
};

export default UserPage;
