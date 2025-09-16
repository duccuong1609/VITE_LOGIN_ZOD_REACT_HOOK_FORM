import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { UserProps } from "@/services/type";

type UserInfoCardProps = {
  isLoading: boolean;
  user: UserProps;
  logout?: () => void;
};

const UserInfoCard = ({ isLoading = true, user, logout }: UserInfoCardProps) => {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Card className="min-w-[72rem] min-h-[36rem] mx-auto shadow-md rounded-2xl">
            <CardHeader className="flex flex-col items-center gap-2">
              <Skeleton className="w-24 h-24 rounded-full animate-pulse" />
              <Skeleton className="h-6 w-32 animate-pulse" />
              <Skeleton className="h-4 w-48 animate-pulse" />
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <Skeleton className="h-4 w-full animate-pulse" />
              <Skeleton className="h-4 w-full animate-pulse" />
              <Skeleton className="h-4 w-full animate-pulse" />
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        user && (
          <motion.div
            key="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <Card className="min-w-[72rem] mx-auto shadow-md rounded-2xl">
              <CardHeader className="flex flex-col items-center gap-2">
                <img
                  src={user.image}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border"
                />
                <CardTitle className="text-xl font-bold">
                  {user.username}
                </CardTitle>
                <CardTitle className="text-xl font-bold">
                  {user.company?.title}
                </CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-6 text-sm">
                <div className="flex col-span-1 flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="font-medium">First Name</span>
                    <span>{user.firstName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Last Name</span>
                    <span>{user.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Gender</span>
                    <span className="capitalize">{user.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Age</span>
                    <span>{user.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Birth Date</span>
                    <span>{user.birthDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Phone</span>
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Department</span>
                    <span>{user.company?.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Name</span>
                    <span>{user.company?.name}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Address</span>
                    <span>{user.address?.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">City</span>
                    <span>{user.address?.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">State</span>
                    <span>{user.address?.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Postal Code</span>
                    <span>{user.address?.postalCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Postal Code</span>
                    <span>{user.address?.postalCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Country</span>
                    <span>{user.address?.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">State Code</span>
                    <span>{user.address?.stateCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Coordinates</span>
                    <span>
                      {user.address?.coordinates?.lat},{" "}
                      {user.address?.coordinates?.lng}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Role</span>
                    <span>{user.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Card Type</span>
                    <span>{user.bank?.cardType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Card Number</span>
                    <span>{user.bank?.cardNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Card Expire</span>
                    <span>{user.bank?.cardExpire}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Iban</span>
                    <span>{user.bank?.iban}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Coin</span>
                    <span>{user.crypto?.coin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Wallet</span>
                    <span>{user.crypto?.wallet}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Network</span>
                    <span>{user.crypto?.network}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button className="text-white mt-4" onClick={logout}>
              Logout
            </Button>
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
};

export default UserInfoCard;
