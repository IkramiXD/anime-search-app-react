import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import TagIcon from "@mui/icons-material/Tag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/reduxHooks";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import {
  addFavorite,
  removeFavorite,
} from "../features/favAnime/favAnimeSlice";
import { useNavigate } from "react-router-dom";
import { useGlobalSnackbar } from "../context/NotiSnackbarContext";
interface AnimeCardProps {
  id: number;
  title: string;
  image: string;
  rank: number;
  score: number;
}

const AnimeCard = ({ id, title, image, rank, score }: AnimeCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favAnime = useAppSelector((state) => state.favoriteAnime);
  const notiSnackbar = useGlobalSnackbar();

  const isFav = favAnime.favorites.some((fav) => fav.id === id);

  const handleAddToFav = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    toggleFav(id, title, image);
  };

  const toggleFav = (id: number, title: string, image: string) => {
    if (isFav) {
      dispatch(removeFavorite(id));
      notiSnackbar(`${title} removed from favorites`);
    } else {
      dispatch(addFavorite({ id, title, image }));
      notiSnackbar(`${title} added to favorites`);
    }
  };

  return (
    <Card
      sx={{
        width: 225,
        position: "relative",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
        },
      }}
      elevation={0}
      onClick={() => navigate(`/details/${id}`)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          src={image}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Tooltip title={title}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {title}
            </Typography>
          </Tooltip>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Tooltip
              title={`Score: ${score ?? "Not Scored"}`}
              placement="bottom"
            >
              <Chip
                icon={<StarIcon />}
                label={score ? `${score}` : "Not Scored"}
                size="small"
                color={score ? "primary" : "default"}
                variant="outlined"
              />
            </Tooltip>

            <Tooltip title={`Rank: ${rank ?? "Not Ranked"}`} placement="bottom">
              <Chip
                icon={<TagIcon />}
                label={rank ? `${rank}` : "Not Ranked"}
                size="small"
                color={rank ? "secondary" : "default"}
                variant="outlined"
              />
            </Tooltip>
          </Box>
        </CardContent>
      </CardActionArea>

      <Box sx={{ position: "absolute", top: 2, right: 2 }}>
        <Tooltip title={isFav ? "Remove from Favorite" : "Add to Favorite"}>
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "50%",
              p: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.9,
            }}
          >
            {isFav ? (
              <IconButton
                size="small"
                color="error"
                onClick={(e) => handleAddToFav(e)}
                sx={{ p: 0.5 }}
              >
                <FavoriteIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton
                size="small"
                color="error"
                onClick={(e) => handleAddToFav(e)}
                sx={{ p: 0.5 }}
              >
                <FavoriteBorderOutlinedIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Tooltip>
      </Box>
    </Card>
  );
};

export default AnimeCard;
