import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface CardProps {
  label: string;
  description: string;
  numerics: string;
  icon: React.ReactElement;
}

export default function OutlinedCard({
  label,
  description,
  numerics,
  icon,
}: CardProps) {
  return (
    <Box sx={{ width: "100%", marginY: "10px" }}>
      <Card
        variant="outlined"
        sx={{
          borderRadius: 3,
          boxShadow: 4,
          "&: hover": {
            transform: "scale(1.01)",
            transition: "all ease-in-out  0.15s ",
          },
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {icon}
              <Typography
                sx={{ fontWeight: "bold" }}
                variant="h5"
                component="div"
              >
                {label}
              </Typography>
            </Box>

            <Typography variant="h5" component="div">
              {numerics}
            </Typography>
          </Box>
          <Typography sx={{ my: 1, fontSize: "0.8rem" }} color="text.secondary">
            {new Intl.DateTimeFormat(["ban", "id"]).format(Date.now())}
          </Typography>
          <Typography sx={{ marginTop: "12.5px" }} variant="body2">
            {description}
          </Typography>
        </CardContent>
        <CardActions>{/* OPTIONAL CHARTS TO BE PLACED HERE */}</CardActions>
      </Card>
    </Box>
  );
}
