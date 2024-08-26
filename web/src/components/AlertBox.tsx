import { Collapse, Alert } from "@mui/material";
import Box from "@mui/material/Box/Box";

interface AlertBoxProps {
  alertOpen: boolean;
  alertMessage: string;
  alertSeverity: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

const AlertBox: React.FC<AlertBoxProps> = ({ alertOpen, alertMessage, alertSeverity, onClose }) => {
  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Collapse in={alertOpen}>
        <Alert
          severity={alertSeverity}
          onClose={onClose}
        >
          {alertMessage}
        </Alert>
      </Collapse>
    </Box>
  );
}

export default AlertBox;
