import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPemesananById } from "../services/pemesananService";
import { fetchPelangganById } from "../services/pelangganService";
import { fetchMenuByIds } from "../services/menuService";

const DetailPesanan = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [pelanggan, setPelanggan] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        // Ambil data pemesanan, pelanggan, menu berdasarkan id
        const pemesanan = await fetchPemesananById(id);
        const pelangganData = await fetchPelangganById(pemesanan.pelanggan);
        const menuData = await fetchMenuByIds(pemesanan.menu);

        // set data ke state
        setPelanggan(pelangganData);
        setMenu(menuData);
        setData(pemesanan);
      } catch (error) {
        console.log("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getData();
    }
  }, [id]);

  // Fungsi untuk memformat tanggal
  const formatDate = (isoString) => new Date(isoString).toLocaleString("id-ID");

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Mengecek apakah data yang diperlukan sudah ada
  if (!data || !pelanggan || menu.length === 0) {
    return <div>Data tidak lengkap atau tidak ditemukan.</div>;
  }

  return (
    <Container maxWidth="md" sx={{ padding: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ marginRight: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">Detail Pesanan</Typography>
      </Box>
      <Card sx={{ marginBottom: 3 }}>
        <CardHeader title="Informasi Pelanggan" />
        <CardContent>
          <Typography variant="subtitle1">
            <strong>Nama:</strong> {pelanggan.nama_pelanggan}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Alamat:</strong> {pelanggan.alamat}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Nomor Telepon:</strong> {pelanggan.nomor_telepon}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ marginBottom: 3 }}>
        <CardHeader title="Informasi Pemesanan" />
        <CardContent>
          <Typography variant="subtitle1">
            <strong>Status:</strong> {data.status}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Tanggal Pemesanan:</strong>{" "}
            {formatDate(data.tanggal_pemesanan)}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Total Harga:</strong> Rp{" "}
            {parseFloat(data.total_harga).toLocaleString("id-ID")}
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Daftar Menu" />
        <CardContent>
          <List>
            {menu.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Typography variant="h6">
                        {item.nama_menu} - Rp{" "}
                        {parseFloat(item.harga).toLocaleString("id-ID")}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Kategori:</strong> {item.kategori}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {item.deskripsi}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DetailPesanan;
