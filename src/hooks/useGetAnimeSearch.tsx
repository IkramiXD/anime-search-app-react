import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  resetAnimePagination,
  setAnimePagination,
} from "../features/animeList/animePaginationSlice";

export interface AnimeSearchParams {
  q: string;
  sfw: boolean;
  page?: number;
  limit?: number;
}

const useGetAnimeSearch = (
  params: AnimeSearchParams = {
    q: "",
    sfw: true,
  }
) => {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const safeParams = {
    ...params,
    limit: params.limit && params.limit <= 25 ? params.limit : 25,
    page: params.page && params.page > 0 ? params.page : 0,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    if (params.q.trim().length === 0) {
      console.log("Search query is empty. Aborting fetch.");
      setResults([]);
      dispatch(resetAnimePagination());
      setErrorMsg("Search query is required.");
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        setErrorMsg("");
        const response = await axios.get("https://api.jikan.moe/v4/anime", {
          params: safeParams,
          signal: controller.signal,
        });
        setResults(response.data.data);
        dispatch(setAnimePagination(response.data.pagination));
      } catch (error: any) {
        if (axios.isCancel(error)) return;
        console.error("Failed to fetch anime search results:", error);
        setErrorMsg(error?.message || "Failed to fetch anime data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [params.q, params.sfw, params.page, params.limit]);

  return { results, isLoading, errorMsg };
};

export default useGetAnimeSearch;
