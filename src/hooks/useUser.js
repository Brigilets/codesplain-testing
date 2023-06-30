import axios from "axios";
import useSWR from "swr";

async function userFetcher(url) {
  const res = await axios.get(url);

  return res.data;
}

export default function useUser() {
  // useSWR fetches data once, and caches data for further use
  const { data, error, isLoading } = useSWR("/api/user", userFetcher);

  return {
    user: data?.user,
    isLoading,
    error,
  };
}
