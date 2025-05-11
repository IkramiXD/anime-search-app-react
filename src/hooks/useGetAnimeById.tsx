import axios from "axios";
import { useEffect, useState } from "react";

const useGetAnimeById = (id: number) => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Anime ID is required.");
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
        setResults(response.data.data);
      } catch (error: any) {
        if (axios.isCancel(error)) return;
        console.error("Failed to fetch anime search results:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [id]);

  return { results, loading, error };
};

export default useGetAnimeById;
