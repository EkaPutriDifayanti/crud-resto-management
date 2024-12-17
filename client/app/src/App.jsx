import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TambahPesanan from "../pages/TambahPesanan";
import Dashboard from "../pages/Dashboard";
import DetailPesanan from "../pages/DetailPesanan";
import EditPesanan from "../pages/EditPesanan";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tambahpesanan" element={<TambahPesanan />} />
          <Route path="/editpesanan/:id" element={<EditPesanan />} />
          <Route path="/detailpesanan/:id" element={<DetailPesanan />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;