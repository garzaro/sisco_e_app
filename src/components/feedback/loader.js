import * as React  from "react";
import {Backdrop, CircularProgress, Typography} from "@mui/material";

export default function PanoDeFundo({ open = false, color, titulo, mensagem, }) {
  return (
    <div>
      <Backdrop
        sx={(theme) => ({color: '#d7cfcf', zIndex: theme.zIndex.drawer + 1})}
        open={open}
      >
        <div style={{textAlign: "center"}}>
          <CircularProgress color={color} size={20} />
          <Typography variant="body2" color="inherit" component="div">
            <h1>{titulo}</h1>
            <h4>{mensagem}</h4>
          </Typography>
        </div>
      </Backdrop>
    </div>
  );
}