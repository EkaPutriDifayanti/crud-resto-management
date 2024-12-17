import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import DeletePesanan from "./DeletePesanan";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { fetchPemesanan, deletePemesanan } from "../services/pemesananService";
import { fetchMenu } from "../services/menuService";
import { fetchPelanggan } from "../services/pelangganService";

const ListPesanan = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [, setMenuData] = useState([]);
  const [, setPelangganData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedPesananId, setSelectedPesananId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        // Mengambil data pemesanan, menu, dan pelanggan
        const pemesanan = await fetchPemesanan();
        const menuResponse = await fetchMenu();
        const pelangganResponse = await fetchPelanggan();
        const menu = menuResponse;
        const pelanggan = pelangganResponse.data;

        // Jika data yang diambil tidak valid, tampilkan pesan kesalahan
        if (!Array.isArray(menu) || !Array.isArray(pelanggan)) {
          console.error("Menu atau Pelanggan tidak valid");
          return;
        }
        setMenuData(menu);
        setPelangganData(pelanggan);

        // Menggabungkan data pemesanan dengan data pelanggan dan menu
        const updatedPemesanan = pemesanan.map((pesanan) => ({
          ...pesanan,
          pelanggan: pelanggan.find((p) => p.id === pesanan.pelanggan),
          menu: pesanan.menu.map((menuId) =>
            menu.find((item) => item.id === menuId)
          ),
        }));
        setData(updatedPemesanan);
      } catch (error) {
        console.log("Gagal mengambil data: ", error);
      }
    };
    getData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "pelanggan.nama_pelanggan",
        header: "Nama Pelanggan",
        Cell: ({ cell }) => cell.getValue() || "Pelanggan Tidak Ditemukan",
      },
      {
        accessorKey: "menu",
        header: "List Menu Yang Dipesan",
        Cell: ({ cell }) => {
          const menuItems = cell.getValue();
          return menuItems.map((menu, index) => (
            <div key={index}>{menu.nama_menu}</div>
          ));
        },
      },
      {
        accessorKey: "total_harga",
        header: "Total Harga",
        Cell: ({ cell }) => {
          return `Rp ${parseFloat(cell.getValue()).toLocaleString("id-ID")}`;
        },
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "actions",
        header: "Aksi",
        size: 100,
        Cell: ({ row }) => {
          const id = row.original.id;
          return (
            <Box sx={{ display: "flex", gap: "4px" }}>
              <Tooltip title="Edit">
                <IconButton
                  className="text-primary-normal hover:bg-blue-300"
                  onClick={() => {
                    navigate(`/editpesanan/${id}/`);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  className="text-red-600 hover:bg-red-200"
                  onClick={() => handleOpenDeleteModal(id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Detail">
                <IconButton
                  className="text-green-600 hover:bg-green-200"
                  onClick={() => {
                    navigate(`/detailpesanan/${id}/`);
                  }}
                >
                  <ListAltRoundedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    ],
    [navigate]
  );

  // Menampilkan modal konfirmasi penghapusan
  const handleOpenDeleteModal = (id) => {
    setSelectedPesananId(id);
    setOpenDeleteModal(true);
  };

  // Menutup modal konfirmasi penghapusan
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedPesananId(null);
  };

  // Menghapus pemesanan
  const handleDeletePesanan = async () => {
    try {
      await deletePemesanan(selectedPesananId);
      setData(data.filter((pesanan) => pesanan.id !== selectedPesananId));
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Gagal menghapus pemesanan:", error);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnPinning: true,
    initialState: { columnPinning: { right: ["actions"] } },
    enableColumnFilters: false,
    muiPaginationProps: {
      color: "primary",
      shape: "rounded",
      showRowsPerPage: false,
      variant: "outlined",
    },
    paginationDisplayMode: "pages",
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <DeletePesanan
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeletePesanan}
      />
    </>
  );
};

ListPesanan.propTypes = {
  cell: PropTypes.object,
  row: PropTypes.object,
};

export default ListPesanan;
