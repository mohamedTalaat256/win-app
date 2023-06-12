import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer =()=>{

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#222935",
        paddingTop: 5,
        
        paddingBottom: 5,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ color: 'text.secondary' }}>
               App
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              {`${new Date().getFullYear()} | React | Material UI | Mohammed Talaat`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;