import "./App.css";
import SearchPage from "./pages/SearchPage";
import { Navigate, Route, Routes } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import AnimeAppBar from "./components/AnimeAppBar";
import { NotiSnackbarProvider } from "./context/NotiSnackbarContext";

const animeTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6200ea",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#f4f6f8",
    },
    text: {
      primary: "#333",
      secondary: "#666",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontFamily: "Segoe UI, sans-serif",
      fontWeight: 700,
      fontSize: "2.5rem",
      color: "#6200ea",
    },
    h2: {
      fontFamily: "Segoe UI, sans-serif",
      fontWeight: 600,
      fontSize: "2rem",
      color: "#ff4081",
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 20px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        PopperProps: {
          sx: {
            pointerEvents: "none",
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={animeTheme}>
      <NotiSnackbarProvider>
        <Box
          sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1200 }}
        >
          <AnimeAppBar />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            mt: 8,
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/search" />} />
            <Route path="/search/:q?" element={<SearchPage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route path="*" element={<Navigate to="/search" />} />
          </Routes>
        </Box>
      </NotiSnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
