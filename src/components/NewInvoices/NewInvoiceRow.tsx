import {
  Box,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import useAnchorDisclosure from "@/hooks/useAnchorDisclosure";
import { ReactComponent as DotsVerticalIcon } from "@/assets/icons/dots-vertical.svg";
import { ReactComponent as DownloadIcon } from "@/assets/icons/download.svg";
import { ReactComponent as PrintIcon } from "@/assets/icons/print.svg";
import { ReactComponent as ShareIcon } from "@/assets/icons/share.svg";
import { ReactComponent as TrashIcon } from "@/assets/icons/trash.svg";
import IInvoice, { InvoiceStatus } from "@/types/interfaces/invoice";

interface INewInvoiceRow {
  invoice: IInvoice;
}

const statusColors: Record<number, "success" | "warning" | "error"> = {
  [InvoiceStatus["Paid"]]: "success",
  [InvoiceStatus["In Progress"]]: "warning",
  [InvoiceStatus["Out Of Date"]]: "error",
};

const NewInvoiceRow: React.FC<INewInvoiceRow> = ({ invoice }) => {
  const { isOpen, onToggle, onClose, anchorEl } = useAnchorDisclosure();

  return (
    <TableRow>
      <TableCell>{invoice.id}</TableCell>
      <TableCell>{invoice.category}</TableCell>
      <TableCell>${invoice.price}</TableCell>
      <TableCell>
        <Chip
          label={InvoiceStatus[invoice.status]}
          color={statusColors[invoice.status]}
        />
      </TableCell>
      <TableCell>
        <IconButton onClick={(e) => onToggle(e.currentTarget)}>
          <DotsVerticalIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={isOpen}
          onClose={onClose}
          PaperProps={{
            sx: {
              p: 8,
              width: 160,
              "& .MuiDivider-root": {
                my: 8,
              },
            },
          }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          anchorOrigin={{ horizontal: "left", vertical: "center" }}
        >
          <MenuItem>
            <Box sx={{ mr: 16, color: "gray.800", flexShrink: 0 }}>
              <DownloadIcon width={20} height={20} />
            </Box>
            <Typography variant="body2">Download</Typography>
          </MenuItem>
          <MenuItem>
            <Box sx={{ mr: 16, color: "gray.800", flexShrink: 0 }}>
              <PrintIcon width={20} height={20} />
            </Box>
            <Typography variant="body2">Print</Typography>
          </MenuItem>
          <MenuItem>
            <Box sx={{ mr: 16, color: "gray.800", flexShrink: 0 }}>
              <ShareIcon width={20} height={20} />
            </Box>
            <Typography variant="body2">Share</Typography>
          </MenuItem>

          <Divider variant="dashed" />

          <MenuItem sx={{ color: "error.main" }}>
            <Box sx={{ mr: 16, flexShrink: 0 }}>
              <TrashIcon width={20} height={20} />
            </Box>
            <Typography variant="body2">Delete</Typography>
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default NewInvoiceRow;
