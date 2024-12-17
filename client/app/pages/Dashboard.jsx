import Navbar from "../components/Navbar";
import ListPesanan from "../components/ListPesanan";
import PrimaryButton from "../components/PrimaryButton";
import { Container } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "flex-end", padding: 3 }}
      >
        <PrimaryButton
          title="Tambah Pesanan"
          startIcon={<AddCircleOutlineRoundedIcon />}
          onClick={() => navigate("/tambahpesanan")}
        />
      </Container>
      <Container maxWidth="xl">
        <ListPesanan />
      </Container>
    </>
  );
};

export default Dashboard;
