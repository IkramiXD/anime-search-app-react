import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const AnimeSearchEmptyInput = () => {
  return (
    <Box
      sx={{
        width: "100%",
        textAlign: "center",
        my: 4,
        color: "text.secondary",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SearchIcon sx={{ fontSize: 80, color: "#90a4ae", mb: 2 }} />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Start Your Search
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        Type something in the search box to begin.
      </Typography>
      <Typography variant="body2">
        Try searching for your favorite anime title or genre.
      </Typography>
    </Box>
  );
};

export default AnimeSearchEmptyInput;
