import { useState, useEffect } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useDebounce from "../hooks/useDebounce";
import { setSearchQuery } from "../features/animeList/animeSearchSlice";
import { store } from "../store";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const animeSearch = store.getState().animeSearch;
  const [searchTerm, setSearchTerm] = useState(animeSearch.q);
  const debounceSearch = useDebounce(searchTerm);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (store.getState().animeSearch.q) {
      setSearchTerm(store.getState().animeSearch.q);
    }
  }, []);

  useEffect(() => {
    dispatch(setSearchQuery(debounceSearch));
  }, [debounceSearch, dispatch]);

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Find your favorite anime..."
        value={searchTerm}
        onChange={handleChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
