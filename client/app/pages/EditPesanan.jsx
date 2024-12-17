import { useState, useEffect } from "react";
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
  Button,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { fetchMenu } from "../services/menuService";
import {
  fetchPemesananById,
  updatePemesanan,
} from "../services/pemesananService";
import {
  fetchPelangganById,
  updatePelanggan,
} from "../services/pelangganService";

const STATUS_CHOICES = [
  { value: "belum diproses", label: "Belum Diproses" },
  { value: "sedang diproses", label: "Sedang Diproses" },
  { value: "selesai", label: "Selesai" },
];

const EditPesanan = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [tanggalPemesanan, setTanggalPemesanan] = useState(dayjs());
  const [status, setStatus] = useState("");
  const [dataMenu, setDataMenu] = useState([]);
  const [pemesananData, setPemesananData] = useState(null);

  useEffect(() => {
    // Ambil data menu
    const getMenuData = async () => {
      try {
        const menuData = await fetchMenu();
        setDataMenu(menuData);
      } catch (error) {
        console.error("Gagal mengambil data menu:", error);
      }
    };

    // Ambil data pesanan dan pelanggan berdasarkan ID
    const getPesananData = async () => {
      try {
        const data = await fetchPemesananById(id);
        const pelangganData = await fetchPelangganById(data.pelanggan);

        setPemesananData(data);
        setNamaPelanggan(pelangganData.nama_pelanggan);
        setAlamat(pelangganData.alamat);
        setNomorTelepon(pelangganData.nomor_telepon);
        setTanggalPemesanan(dayjs(data.tanggal_pemesanan));
        setStatus(data.status);
        setSelectedMenu(data.menu);
      } catch (error) {
        console.error("Gagal mengambil data pesanan: ", error);
      }
    };

    getMenuData();
    getPesananData();
  }, [id]);

  // Fungsi untuk memilih menu yang akan dipesan
  const handleSelectMenu = (menuId) => {
    setSelectedMenu((prevSelected) =>
      prevSelected.includes(menuId)
        ? prevSelected.filter((id) => id !== menuId)
        : [...prevSelected, menuId]
    );
  };

  // Menghitung total harga dari menu yang dipilih
  const totalHarga = selectedMenu
    .map((menuId) => {
      const menu = dataMenu.find((menu) => menu.id === menuId);
      return menu ? menu.harga : 0;
    })
    .reduce((acc, curr) => acc + parseFloat(curr), 0);

  // Fungsi untuk menyimpan perubahan
  const handleSubmit = async () => {
    if (
      !namaPelanggan ||
      !alamat ||
      !nomorTelepon ||
      selectedMenu.length === 0
    ) {
      alert("Harap lengkapi semua data.");
      return;
    }

    // Data pelanggan yang diperbarui
    const updatedPelangganData = {
      nama_pelanggan: namaPelanggan,
      alamat: alamat,
      nomor_telepon: nomorTelepon,
    };

    try {
      // update data pelanggan
      const pelangganResponse = await updatePelanggan(
        pemesananData.pelanggan,
        updatedPelangganData
      );
      console.log("Pelanggan berhasil diperbarui:", pelangganResponse);

      // Update pesanan dengan data yang baru
      const updatedPesananData = {
        pelanggan: pemesananData.pelanggan,
        tanggal_pemesanan: tanggalPemesanan.toISOString(),
        status,
        total_harga: totalHarga.toFixed(2),
        menu: selectedMenu,
      };

      // Update pesanan dengan data yang baru ke server
      const pesananResponse = await updatePemesanan(id, updatedPesananData);
      console.log("Pesanan berhasil diperbarui:", pesananResponse);
      navigate("/");
    } catch (error) {
      console.error("Gagal menyimpan perubahan:", error);
    }
  };

  // Menampilkan loading spinner jika data belum diambil
  if (!pemesananData) {
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

  return (
    <Container maxWidth="md" sx={{ padding: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ marginRight: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">Edit Pesanan</Typography>
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
          value={namaPelanggan}
          onChange={(e) => setNamaPelanggan(e.target.value)} // Mengupdate state
          fullWidth
        />
        <TextField
          label="Alamat"
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)} // Mengupdate state
          fullWidth
        />
        <TextField
          label="Nomor Telepon"
          value={nomorTelepon}
          onChange={(e) => setNomorTelepon(e.target.value)} // Mengupdate state
          fullWidth
        />
      </Box>
      <Box sx={{ marginBottom: 3 }}>
        <DatePicker
          label="Tanggal Pemesanan"
          value={tanggalPemesanan}
          onChange={(newDate) => setTanggalPemesanan(newDate)}
        />
      </Box>
      <TextField
        label="Status Pesanan"
        select
        fullWidth
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ marginBottom: 3 }}
      >
        {STATUS_CHOICES.map((choice) => (
          <MenuItem key={choice.value} value={choice.value}>
            {choice.label}
          </MenuItem>
        ))}
      </TextField>
      <Card sx={{ marginBottom: 3 }}>
        <CardHeader title="Daftar Menu" />
        <CardContent>
          <List>
            {dataMenu.map((menu) => (
              <ListItem key={menu.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMenu.includes(menu.id)}
                      onChange={() => handleSelectMenu(menu.id)}
                    />
                  }
                  label={`${menu.nama_menu} - Rp ${parseFloat(
                    menu.harga
                  ).toLocaleString("id-ID")}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <Typography variant="h6" sx={{ marginBottom: 3 }}>
        Total Harga: Rp {totalHarga.toLocaleString("id-ID")}
      </Typography>
      <Box sx={{ textAlign: "right" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Simpan Perubahan
        </Button>
      </Box>
    </Container>
  );
};

export default EditPesanan;