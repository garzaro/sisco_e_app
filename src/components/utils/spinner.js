import React from 'react';
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";

const MeuSpinner = ({size = 36, cor = "success"}) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" mt={2} height="100vh">
            <CircularProgress size={size} color={cor} />
            <span className="visually-hidden">Loading...</span>
        </Box>

    );
}
export default MeuSpinner;

/*cor: pode ser "primary", "secondary", "inherit", "success", "error", "info", "warning"*/