import PropTypes from "prop-types";
import { Button } from "@mui/material";

const PrimaryButton = ({ startIcon, title, onClick }) => {
  return (
    <Button
      variant="contained"
      startIcon={startIcon}
      sx={{ fontSize: 14, fontWeight: 600, padding: 2 }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

PrimaryButton.propTypes = {
  startIcon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PrimaryButton;