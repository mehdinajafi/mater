import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteProduct from "@/api/e-commerce/deleteProduct";

interface IDeleteProductModal {
  open: boolean;
  onClose: () => void;
  selectionModel: GridSelectionModel;
}

const DeleteProductDialog: React.FC<IDeleteProductModal> = (props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      props.onClose();
    },
  });

  const poductsLength = props.selectionModel.length;

  const handleDelete = () => {
    mutation.mutate({ ids: props.selectionModel as string[] });
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      PaperProps={{ sx: { maxWidth: 444, width: "100%" } }}
    >
      <DialogTitle>Delete</DialogTitle>
      <DialogContent>
        {poductsLength === 1
          ? "Are you sure want to delete?"
          : `Are you sure want to delete ${poductsLength} items?`}
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="contained"
          disabled={mutation.isLoading}
          onClick={handleDelete}
          startIcon={
            mutation.isLoading && (
              <CircularProgress disableShrink color="inherit" size={16} />
            )
          }
        >
          Delete
        </Button>
        <Button color="dark" variant="outlined" onClick={props.onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProductDialog;
