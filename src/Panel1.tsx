import { Box, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

export const Panel1: React.FC<PropsWithChildren<{}>> = (props) => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography>{props.children}</Typography>
        </Box>
    );
}