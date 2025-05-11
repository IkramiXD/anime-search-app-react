import { useNavigate, useParams } from "react-router-dom";
import useGetAnimeById from "../hooks/useGetAnimeById";
import { Box, Button, Typography, Skeleton, Paper } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AnimeInfoCard from "../components/AnimeInfoCard";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/reduxHooks";
import {
  addFavorite,
  removeFavorite,
} from "../features/favAnime/favAnimeSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useGlobalSnackbar } from "../context/NotiSnackbarContext";

const SkeletonLoader = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Box
      display="flex"
      flexWrap="wrap"
      flexDirection={{ xs: "column", md: "row" }}
      alignItems={{ xs: "center", md: "flex-start" }}
    >
      <Paper
        elevation={0}
        sx={{ width: 225, height: 318, borderRadius: 2, overflow: "hidden" }}
      >
        <Skeleton variant="rectangular" width={225} height={318} />
      </Paper>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        mx={2}
        maxWidth={{ md: `calc(100% - 225px - 32px)` }}
        gap={2}
      >
        <Box textAlign="left">
          <Skeleton variant="text" width={200} height={32} />
          <Skeleton variant="text" width={100} height={32} />
        </Box>
        <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
          <Skeleton variant="text" height={24} width="100%" />
          <Skeleton variant="text" height={24} width="100%" />
          <Skeleton variant="text" height={24} width="90%" />
        </Box>
        <Box
          display="flex"
          gap={2}
          flexWrap="wrap"
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              sx={{
                width: 186,
                height: 78,
                borderRadius: 3,
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
    <Box
      display="flex"
      gap={2}
      flexWrap="wrap"
      mt={2}
      justifyContent={"space-between"}
    >
      <Skeleton
        variant="rectangular"
        width={100}
        height={45}
        sx={{ borderRadius: 2 }}
      />
      <Skeleton
        variant="rectangular"
        width={190}
        height={45}
        sx={{ borderRadius: 2 }}
      />
    </Box>
  </Box>
);

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { results, loading, error } = useGetAnimeById(Number(id));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favAnime = useAppSelector((state) => state.favoriteAnime);
  const animeId = Number(id);
  const isLoading = loading || !results;
  const notiSnackbar = useGlobalSnackbar();

  const isFav = favAnime.favorites.some((fav) => fav.id === animeId);

  const handleToggleFavorite = () => {
    if (!results) return;
    const { title, images } = results;
    if (isFav) {
      dispatch(removeFavorite(animeId));
      notiSnackbar(`${title} removed from favorites`);
    } else {
      dispatch(
        addFavorite({ id: animeId, title, image: images.jpg.image_url })
      );
      notiSnackbar(`${title} added to favorites`);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth={1200}
      width="100%"
      mx="auto"
    >
      {isLoading ? (
        <SkeletonLoader />
      ) : error.trim().length > 0 ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <Box
            display="flex"
            flexWrap="wrap"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems={{ xs: "center", md: "flex-start" }}
          >
            <Paper
              elevation={0}
              sx={{
                width: 225,
                height: 318,
                overflow: "hidden",
                borderRadius: 2,
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <img
                src={results.images.jpg.image_url}
                alt={results.title}
                width={225}
                height={318}
              />
            </Paper>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              mx={2}
              maxWidth={{ md: `calc(100% - 225px - 32px)` }}
              gap={2}
            >
              <Box textAlign="left">
                <Typography variant="h5">{results.title}</Typography>
                <Typography variant="h6">Synopsis</Typography>
              </Box>
              <Typography variant="body1" align="left">
                {results.synopsis}
              </Typography>
              <Box
                display="flex"
                gap={2}
                flexWrap="wrap"
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <AnimeInfoCard
                  info1={results.score?.toString() || "0"}
                  info2={
                    results.scored_by
                      ? `${results.scored_by.toLocaleString()} USERS`
                      : "0 USERS"
                  }
                  textColor="#2E7D32"
                />
                <AnimeInfoCard
                  info1={results.rank ? `#${results.rank}` : "N/A"}
                  info2={results.rank ? "RANKED" : "NOT RANKED"}
                  textColor="#01579B"
                />
                <AnimeInfoCard
                  info1={results.popularity?.toLocaleString() || "0"}
                  info2="POPULARITY"
                  textColor="#BF360C"
                />
                <AnimeInfoCard
                  info1={results.members?.toLocaleString() || "0"}
                  info2="MEMBERS"
                  textColor="#6A1B9A"
                />
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            gap={2}
            flexWrap="wrap"
            mt={2}
            justifyContent={"space-between"}
          >
            <Button
              // startIcon={<ArrowBackIosIcon />}
              size="medium"
              variant="contained"
              onClick={() => navigate("/search")}
            >
              <Box
                sx={{
                  display: "flex",
                  height: 24.5,
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <ArrowBackIosIcon />
                <Typography
                  variant="button"
                  sx={{
                    display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                  }}
                >
                  Back
                </Typography>
              </Box>
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={handleToggleFavorite}
              color="secondary"
              // startIcon={isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            >
              <Box
                sx={{
                  display: "flex",
                  height: 24.5,
                  gap: 1,
                  alignItems: "center",
                }}
              >
                {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                <Typography
                  variant="button"
                  sx={{
                    display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                  }}
                >
                  {isFav ? "Remove from Favorites" : "Add to Favorites"}
                </Typography>
              </Box>
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DetailsPage;
