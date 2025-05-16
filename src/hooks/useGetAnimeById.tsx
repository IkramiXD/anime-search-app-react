import axios from "axios";
import { useEffect, useState } from "react";

const useGetAnimeById = (id: number) => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Anime ID is required.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        setError("");
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}`,
          { signal: controller.signal }
        );
        if (response.data.error) {
          setError(response.data.message);
          setLoading(false);
        } else {
          setResults(response.data.data);
          setLoading(false);
        }
      } catch (error: any) {
        if (axios.isCancel(error)) return;
        console.error("Failed to fetch anime search results:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [id]);

  return { results, loading, error };
};

export default useGetAnimeById;
