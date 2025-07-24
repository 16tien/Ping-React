import { useEffect, useState } from "react";
import { getUserById } from "../api/userApi";
import type { User } from "../types/auth";


export function useUser(userId: number | null) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    getUserById(userId)
      .then((res) => {
        setUser(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  return { user, loading, error };
}
