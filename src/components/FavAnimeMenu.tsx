import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppSelector } from "../hooks/reduxHooks";
import HideSourceIcon from "@mui/icons-material/HideSource";
import { useNavigate } from "react-router-dom";

const FavAnimeMenu = () => {
  const navigate = useNavigate();
  const favAnime = useAppSelector((state) => state.favoriteAnime);

  const [anchorElFav, setAnchorElFav] = React.useState<null | HTMLElement>(
    null
  );

  const handleFavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElFav(event.currentTarget);
  };

  const handleFavListClicked = (id: number) => {
    setAnchorElFav(null);
    navigate(`/details/${id}`);
  };

  const handleCloseFavMenu = () => {
    setAnchorElFav(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Favourites">
        <Badge badgeContent={favAnime.favorites.length} color="secondary">
          <IconButton onClick={handleFavMenu} sx={{ p: 0 }}>
            <FavoriteIcon sx={{ color: "white" }} />
          </IconButton>
        </Badge>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElFav}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElFav)}
        onClose={handleCloseFavMenu}
      >
        {favAnime.favorites.length === 0 ? (
          <MenuItem key={0} onClick={handleCloseFavMenu}>
            <Box
              sx={{ height: 30, display: "flex", gap: 1, alignItems: "center" }}
            >
              <HideSourceIcon />
              <Typography>No favorites yet.</Typography>
            </Box>
          </MenuItem>
        ) : (
          favAnime.favorites.map((fav, index) => (
            <MenuItem key={index} onClick={() => handleFavListClicked(fav.id)}>
              <Tooltip title={fav.title}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    width: "100%",
                    maxWidth: 300,
                  }}
                >
                  <Box sx={{ flexShrink: 0 }}>
                    <img
                      src={fav.image}
                      alt={fav.title}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "8px",
                      }}
                    />
                  </Box>
                  <Typography
                    title={fav.title}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      flexGrow: 1,
                    }}
                  >
                    {fav.title}
                  </Typography>
                </Box>
              </Tooltip>
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
};

export default FavAnimeMenu;
