import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const Navbar = () => {
  return (
    <AppBar position="absolute" sx={{ padding:1, boxShadow: 0}}>
      <Container maxWidth = "xl">
        <Toolbar>
          <FastfoodIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
            }}
          >
            Restaurant Management
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;