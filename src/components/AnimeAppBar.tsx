import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FavAnimeMenu from "./FavAnimeMenu";

const AnimeAppBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <DashboardIcon sx={{ mr: 2 }} />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                    md: "block",
                    lg: "block",
                  },
                }}
              >
                Anime Search App
              </Typography>
            </Box>
            <Box>
              <FavAnimeMenu />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AnimeAppBar;
