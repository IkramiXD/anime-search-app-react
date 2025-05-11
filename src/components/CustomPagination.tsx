import { Box, TablePagination } from "@mui/material";
import { useAppSelector } from "../hooks/reduxHooks";
import { useDispatch } from "react-redux";
import {
  setSearchLimit,
  setSearchPage,
} from "../features/animeList/animeSearchSlice";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const CustomPagination = () => {
  const dispatch = useDispatch();
  const animePage = useAppSelector((state) => state.animePagination);

  const [currentPage, setCurrentPage] = useState(
    () => animePage.current_page - 1
  );
  const [rowsPerPage, setRowsPerPage] = useState(
    () => animePage.items.per_page
  );
  const [totalItems, setTotalItems] = useState(() => animePage.items.total);

  const debouncedPage = useDebounce(currentPage);
  const debouncedRowsPerPage = useDebounce(rowsPerPage);

  useEffect(() => {
    dispatch(setSearchPage(debouncedPage + 1));
  }, [debouncedPage, dispatch]);

  useEffect(() => {
    dispatch(setSearchLimit(debouncedRowsPerPage));
  }, [debouncedRowsPerPage, dispatch]);

  useEffect(() => {
    const newPage = animePage.current_page - 1;
    const newRowsPerPage = animePage.items.per_page;
    const newTotalItems = animePage.items.total;

    if (
      currentPage !== newPage ||
      rowsPerPage !== newRowsPerPage ||
      totalItems !== newTotalItems
    ) {
      setCurrentPage(newPage);
      setRowsPerPage(newRowsPerPage);
      setTotalItems(newTotalItems);
    }
  }, [animePage]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value, 10);
    setRowsPerPage(newLimit);
    setCurrentPage(0);
  };

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        display: "flex",
        justifyContent: { xs: "center", sm: "flex-end" },
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <TablePagination
          component="div"
          count={totalItems}
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton
          showLastButton
          rowsPerPageOptions={[5, 10, 15, 20, 25]}
          sx={{
            "& .MuiTablePagination-toolbar": {
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "0 2px",
              alignItems: "baseline",
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                margin: "8px 0px 8px",
              },
            "& .MuiTablePagination-actions": {
              ml: { xs: "0px !important", sm: "20px !important" },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default CustomPagination;
