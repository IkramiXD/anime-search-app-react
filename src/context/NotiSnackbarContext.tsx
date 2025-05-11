import { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, SlideProps, Box, Typography, Slide } from "@mui/material";

const NotiSnackbarContext = createContext<(message: string) => void>(() => {});

export const useGlobalSnackbar = () => useContext(NotiSnackbarContext);

export const NotiSnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [snackKey, setSnackKey] = useState<number>(new Date().getTime());

  const showMessage = (msg: string) => {
    setMessage(msg);
    setSnackKey(new Date().getTime());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SlideTransition = (props: SlideProps) => {
    return <Slide {...props} direction="left" />;
  };

  return (
    <NotiSnackbarContext.Provider value={showMessage}>
      {children}
      <Snackbar
        key={snackKey}
        open={open}
        onClose={handleClose}
        slots={{ transition: SlideTransition }}
        autoHideDuration={1200}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box
          sx={{
            mt: 6,
            bgcolor: "#fff",
            color: "primary.main",
            border: "1px solid",
            borderColor: "primary.main",
            px: 3,
            py: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle2">{message}</Typography>
        </Box>
      </Snackbar>
    </NotiSnackbarContext.Provider>
  );
};
