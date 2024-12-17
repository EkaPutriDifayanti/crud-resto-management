import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from "@mui/material";

const DeletePesanan = ({ open, onClose, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Apakah Anda yakin ingin menghapus pemesanan ini?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Batal
        </Button>
        <Button onClick={onDelete} color="secondary">
          Hapus
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeletePesanan.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeletePesanan;