"use client";

import { useAuth } from "@/store/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "doctor" | "patient")[]; 
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = "/",
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const userRole = typeof user?.role === 'string' ? user.role : user?.role?.roleName;

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(redirectTo);
        return;
      }
      if (allowedRoles && userRole && !allowedRoles.includes(userRole as any)) {
        router.push("/"); 
      }
    }
  }, [user, isLoading, router, allowedRoles, redirectTo, userRole]);

  
  if (isLoading) {
    return <Loader fullScreen={true} text="Loading..." />;
  }

  if (!user) return null;

  if (allowedRoles && userRole && !allowedRoles.includes(userRole as any)) return null;

  return <>{children}</>;
}