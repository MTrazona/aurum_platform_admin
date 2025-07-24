import { getRequestsPromote } from "@/apis/rank-up-requests";
import { useQuery } from "@tanstack/react-query";

export default function useRequestsPromotion() {
  const { data, isLoading } = useQuery({
    queryKey: ["request-promotion"],
    queryFn: getRequestsPromote,
  });

  return {
    data,
    isLoading,
  };
}
