import { Box, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const AnimeNotFound = () => {
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
      <SearchOffIcon sx={{ fontSize: 80, color: "#b0bec5", mb: 2 }} />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        No Results Found
      </Typography>
      <Typography variant="body1">
        We couldn’t find any anime matching your search.
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Try using different keywords or check for spelling errors.
      </Typography>
    </Box>
  );
};

export default AnimeNotFound;
