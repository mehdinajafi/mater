import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import NewInvoiceRow from "./NewInvoiceRow";
import IInvoice from "@/types/interfaces/invoice";
import { ReactComponent as ChevronRight } from "@/assets/icons/chevron-right.svg";

interface INewInvoices {
  invoices: IInvoice[];
}

const NewInvoices: React.FC<INewInvoices> = (props) => {
  return (
    <Card>
      <CardHeader title="New Invoice" sx={{ p: 24 }} />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.invoices.map((invoice) => (
              <NewInvoiceRow key={invoice.id} invoice={invoice} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider />

      <Box p={16} textAlign="end">
        <Button endIcon={<ChevronRight />} color="inherit" size="small">
          View All
        </Button>
      </Box>
    </Card>
  );
};

export default NewInvoices;
