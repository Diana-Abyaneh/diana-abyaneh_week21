import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  const token = typeof window !== "undefined" && localStorage.getItem("token");
  if (!token) return null;

  return children;
}
