import { Slide, SlideProps, Snackbar } from "@mui/material";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

interface NotiSnackBarProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const NotiSnackBar = ({ open, message, onClose }: NotiSnackBarProps) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      slots={{ transition: SlideTransition }}
      message={message}
      autoHideDuration={1500}
    />
  );
};

export default NotiSnackBar;
