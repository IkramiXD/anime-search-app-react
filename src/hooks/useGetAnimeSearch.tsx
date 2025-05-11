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
  searchParams: AnimeSearchParams = {
    q: "",
    sfw: true,
  }
) => {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const safeParams = {
    ...searchParams,
    limit:
      searchParams.limit && searchParams.limit <= 25 ? searchParams.limit : 25,
    page: searchParams.page && searchParams.page > 0 ? searchParams.page : 0,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
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
        setIsLoading(false);
      } catch (error: any) {
        if (axios.isCancel(error)) return;
        console.error("Failed to fetch anime search results:", error);
        setErrorMsg(error?.message || "Failed to fetch anime data.");
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [searchParams.q, searchParams.sfw, searchParams.page, searchParams.limit]);

  return { results, isLoading, errorMsg };
};

export default useGetAnimeSearch;
