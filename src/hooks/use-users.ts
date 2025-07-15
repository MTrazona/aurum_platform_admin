import { fetchUsers } from "@/apis/users";
import { useQuery } from "@tanstack/react-query";

export default function useUsersHooks() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return {
    data,
    isLoading,
  };
}
