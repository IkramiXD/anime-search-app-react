import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface AnimeSearchErrorProps {
  errorMsg: string;
}

const AnimeSearchError = ({ errorMsg }: AnimeSearchErrorProps) => {
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
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "#ef5350", mb: 2 }} />
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Something Went Wrong
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        {errorMsg}
      </Typography>
      <Typography variant="body2">
        Please try again later or check your internet connection.
      </Typography>
    </Box>
  );
};

export default AnimeSearchError;
