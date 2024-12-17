import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  Divider,
  Button,
  MenuItem,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { fetchMenu } from "../services/menuService";
import { postPemesanan } from "../services/pemesananService";
import { postPelanggan } from "../services/pelangganService";

const STATUS_CHOICES = [
  { value: "belum diproses", label: "Belum Diproses" },
  { value: "sedang diproses", label: "Sedang Diproses" },
  { value: "selesai", label: "Selesai" },
];

const TambahPesanan = () => {
  const navigate = useNavigate();
  const [listMenu, setListMenu] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [tanggalPemesanan, setTanggalPemesanan] = useState(dayjs());
  const [status, setStatus] = useState("belum diproses");
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");

  // Mengambil data menu dari MenuService
  useEffect(() => {
    const getListMenu = async () => {
      try {
        const menuData = await fetchMenu();
        if (menuData && Array.isArray(menuData)) {
          setListMenu(menuData);
        } else {
          console.error("Data menu tidak valid:", menuData);
        }
      } catch (error) {
        console.error("Gagal mengambil list menu: ", error);
      }
    };
    getListMenu();
  }, []);

  // Fungsi untuk memilih menu yang akan dipesan
  const handleSelectMenu = (menuId) => {
    setSelectedMenu((prevSelected) =>
      prevSelected.includes(menuId)
        ? prevSelected.filter((id) => id !== menuId)
        : [...prevSelected, menuId]
    );
  };

  // Menghitung total harga pesanan
  const totalHarga = selectedMenu
    .map((menuId) => listMenu.find((menu) => menu.id === menuId)?.harga || 0)
    .reduce((acc, curr) => acc + parseFloat(curr), 0);

  // Fungsi untuk membuat pelanggan baru dan mengembalikan ID pelanggan
  const createPelanggan = async () => {
    try {
      const pelangganData = {
        nama_pelanggan: namaPelanggan,
        alamat: alamat,
        nomor_telepon: nomorTelepon,
      };

      const response = await postPelanggan(pelangganData);
      if (response && response.id) {
        return response.id;
      } else {
        throw new Error("Pelanggan tidak dapat dibuat. ID tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error saat membuat pelanggan:", error);
      throw error;
    }
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async () => {
    try {
      const pelangganId = await createPelanggan();
      const dataPesanan = {
        pelanggan: pelangganId,
        menu: selectedMenu,
        tanggal_pemesanan: tanggalPemesanan.toISOString(),
        status: status,
        total_harga: totalHarga.toFixed(2),
      };

      // Mengirimkan data pesanan ke database
      try {
        const result = await postPemesanan(dataPesanan);
        console.log("Pesanan berhasil disimpan:", result);
        navigate("/");
      } catch (error) {
        console.error(
          "Gagal menyimpan pesanan:",
          error.response?.data || error.message
        );
      }
    } catch (error) {
      console.error(
        "Gagal membuat pelanggan:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Container maxWidth="md" sx={{ padding: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ marginRight: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">Tambah Pesanan</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginBottom: 3,
        }}
      >
        <TextField
          label="Nama Pelanggan"
          variant="outlined"
          fullWidth
          value={namaPelanggan}
          onChange={(e) => setNamaPelanggan(e.target.value)}
        />
        <TextField
          label="Alamat"
          variant="outlined"
          fullWidth
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
        />
        <TextField
          label="Nomor Telepon"
          variant="outlined"
          fullWidth
          value={nomorTelepon}
          onChange={(e) => setNomorTelepon(e.target.value)}
        />
      </Box>
      <Box sx={{ marginBottom: 3 }}>
        <DatePicker
          label="Tanggal Pemesanan"
          value={tanggalPemesanan}
          onChange={(newDate) => setTanggalPemesanan(newDate)}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </Box>
      <Box sx={{ marginBottom: 3 }}>
        <TextField
          label="Status Pesanan"
          select
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {STATUS_CHOICES.map((choice) => (
            <MenuItem key={choice.value} value={choice.value}>
              {choice.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Card sx={{ marginBottom: 3 }}>
        <CardHeader title="Daftar Menu" />
        <CardContent>
          <List>
            {listMenu.length > 0 ? (
              listMenu.map((menu) => (
                <React.Fragment key={menu.id}>
                  <ListItem>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedMenu.includes(menu.id)}
                          onChange={() => handleSelectMenu(menu.id)}
                        />
                      }
                      label={
                        <>
                          <Typography variant="subtitle1">
                            {menu.nama_menu} - Rp{" "}
                            {parseFloat(menu.harga).toLocaleString("id-ID")}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {menu.kategori.toUpperCase()} | {menu.deskripsi}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                Menu tidak tersedia.
              </Typography>
            )}
          </List>
        </CardContent>
      </Card>
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" color="primary">
          Total Harga: Rp {totalHarga.toLocaleString("id-ID")}
        </Typography>
      </Box>
      <Box sx={{ textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={
            selectedMenu.length === 0 ||
            !namaPelanggan ||
            !alamat ||
            !nomorTelepon
          }
        >
          Simpan Pesanan
        </Button>
      </Box>
    </Container>
  );
};

export default TambahPesanan;
