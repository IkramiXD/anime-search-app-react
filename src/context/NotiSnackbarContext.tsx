import { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Slide, SlideProps } from "@mui/material";

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
    return <Slide {...props} direction="up" />;
  };

  return (
    <NotiSnackbarContext.Provider value={showMessage}>
      {children}
      <Snackbar
        key={snackKey}
        open={open}
        onClose={handleClose}
        slots={{ transition: SlideTransition }}
        message={message}
        autoHideDuration={1200}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        slotProps={{
          content: {
            sx: {
              backgroundColor: "#6200ea",
              color: "#fff",
            },
          },
        }}
      />
    </NotiSnackbarContext.Provider>
  );
};
