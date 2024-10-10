import { useEffect, useState } from "react";
import { UserEntity } from "../entities/user";

export function useFetchUsers() {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const url = "http://localhost:4000/api/v1/users";

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: UserEntity[] = await response.json();
        console.log("data", data);
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      setUsers([]);
    };
  }, [url]);

  return { users, loading, error };
}
