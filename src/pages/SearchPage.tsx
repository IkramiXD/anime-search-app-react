import { Box } from "@mui/material";
import SearchBar from "../components/SearchBar";
import AnimeList from "../components/AnimeList";
import CustomPagination from "../components/CustomPagination";
import ScrollTopButton from "../components/utility/ScrollToTopBtn";

const SearchPage = () => {
  return (
    <>
      <Box
        sx={{
          width: 1200,
          maxWidth: 1200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <SearchBar></SearchBar>
        <AnimeList></AnimeList>
        <CustomPagination></CustomPagination>
      </Box>
      <ScrollTopButton />
    </>
  );
};

export default SearchPage;
