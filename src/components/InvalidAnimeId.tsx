import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

const InvalidAnimeId = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/search");
  };

  return (
    <Box>
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
        <ErrorOutlineIcon sx={{ fontSize: 80, color: "#ef9a9a", mb: 2 }} />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Invalid Anime ID
        </Typography>
        <Typography variant="body1">
          The anime you're trying to access doesn't exist.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 3 }}>
          Please check your link or go back to the search page.
        </Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={handleRedirect}>
        Go to Search
      </Button>
    </Box>
  );
};

export default InvalidAnimeId;
