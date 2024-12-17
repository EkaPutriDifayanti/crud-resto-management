import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ padding:1 }}>
      <Container maxWidth="xl">
        <Toolbar>
          <FastfoodIcon sx={{ display: { xs: "none", md: "flex" }, mr: 2 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            MANAJEMEN RESTORAN
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;