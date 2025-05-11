import { Card, Typography } from "@mui/material";

interface AnimeInfoCardProps {
  info1: string;
  info2: string;
  textColor: string;
}

const AnimeInfoCard = ({
  info1,
  info2,
  textColor,
}: AnimeInfoCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 50,
        px: 2,
        py: 1.5,
        color: textColor,
        border: `2px solid ${textColor}`,
        borderRadius: 3,
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
        backgroundColor: "#fff",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Typography
        variant="h6"
        align="center"
        noWrap
        sx={{ fontWeight: 600, fontSize: "1.25rem" }}
      >
        {info1}
      </Typography>
      <Typography
        variant="body2"
        align="center"
        noWrap
        sx={{ fontWeight: 500, fontSize: "0.9rem", opacity: 0.75 }}
      >
        {info2}
      </Typography>
    </Card>
  );
};

export default AnimeInfoCard;
