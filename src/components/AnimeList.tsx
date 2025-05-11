import { useAppSelector } from "../hooks/reduxHooks";
import AnimeCard from "./AnimeCard";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Skeleton,
  Stack,
} from "@mui/material";
import useGetAnimeSearch from "../hooks/useGetAnimeSearch";
import AnimeNotFound from "./AnimeNotFound";
import AnimeSearchError from "./AnimeSearchError";
import AnimeSearchEmptyInput from "./AnimeSearchEmptyInput";

// Loading Skeleton
const SkeletonLoader = (limit: number) => {
  return (
    <>
      {Array.from({ length: limit }).map((_, index) => (
        <Card sx={{ width: 225 }} elevation={2}>
          <CardActionArea>
            {/* Image Skeleton */}
            <Skeleton variant="rectangular" height={300} />

            <CardContent>
              {/* Title Skeleton */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Skeleton variant="text" height={20} width="80%" />
                <Skeleton variant="text" height={20} width="60%" />
              </Box>

              {/* Chips Skeleton */}
              <Stack
                direction="row"
                spacing={1}
                mt={1}
                justifyContent={"center"}
              >
                <Skeleton
                  variant="rounded"
                  width={60}
                  height={24}
                  sx={{ borderRadius: 16 }}
                />
                <Skeleton
                  variant="rounded"
                  width={60}
                  height={24}
                  sx={{ borderRadius: 16 }}
                />
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </>
  );
};

const AnimeList = () => {
  const animeSearchParams = useAppSelector((state) => state.animeSearch);

  const { results, isLoading, errorMsg } = useGetAnimeSearch({
    q: animeSearchParams.q,
    sfw: animeSearchParams.sfw,
    page: animeSearchParams.page,
    limit: animeSearchParams.limit,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
      }}
    >
      {animeSearchParams.q.trim().length === 0 ? (
        <AnimeSearchEmptyInput></AnimeSearchEmptyInput>
      ) : isLoading ? (
        SkeletonLoader(animeSearchParams.limit ? animeSearchParams.limit : 10)
      ) : errorMsg.trim().length > 0 ? (
        <AnimeSearchError errorMsg={errorMsg} />
      ) : results.length === 0 ? (
        <AnimeNotFound />
      ) : (
        results.map((anime, index) => (
          <div key={index}>
            <AnimeCard
              id={anime.mal_id}
              title={anime.title}
              image={anime.images.jpg.image_url}
              rank={anime.rank}
              score={anime.score}
            />
          </div>
        ))
      )}
    </Box>
  );
};

export default AnimeList;
