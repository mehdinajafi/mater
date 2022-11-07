import { useState } from "react";
import { Box, Button, InputBase } from "@mui/material";
import { nanoid } from "nanoid";
import { ReactComponent as PlusIcon } from "@/assets/icons/plus.svg";

const AddNewColumnForm: React.FC<{
  addNewColumn: (columnId: string, title: string) => void;
}> = (props) => {
  const [columnTitle, setColumnTitle] = useState("");
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };

  const handleColumnTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(e.currentTarget.value);
  };

  const handleColumnTitleOnBlur = () => {
    setShowForm(false);
    setColumnTitle("");
    if (columnTitle.trim().length !== 0) {
      props.addNewColumn(nanoid(), columnTitle);
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (columnTitle.trim().length !== 0) {
      props.addNewColumn(nanoid(), columnTitle);
      setShowForm(false);
      setColumnTitle("");
    }
  };

  return (
    <Box sx={{ width: 280 }}>
      {!showForm ? (
        <Button
          variant="outlined"
          color="dark"
          onClick={openForm}
          fullWidth
          size="large"
          startIcon={<PlusIcon />}
        >
          Add Section
        </Button>
      ) : (
        <form onSubmit={handleSubmit}>
          <InputBase
            value={columnTitle}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleOnBlur}
            placeholder="New section"
            autoFocus={true}
            sx={(theme) => ({
              border: `1px solid ${theme.palette.gray[800]}`,
              borderRadius: theme.borderRadius.md,
              width: "100%",
              "& input": {
                py: 16.5,
                px: 14,
                fontSize: theme.typography.fontSizes.lg,
                fontWeight: theme.typography.fontWeights.bold,
              },
            })}
          />
        </form>
      )}
    </Box>
  );
};

export default AddNewColumnForm;
