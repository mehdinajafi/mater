import React, { useState, useId, useMemo } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
  Select,
  SelectChangeEvent,
  Chip,
  Link,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  gridDateComparator,
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import getProducts from "@/api/e-commerce/getProducts";
import deleteProduct from "@/api/e-commerce/deleteProduct";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as PenIcon } from "@/assets/icons/pen.svg";
import { ReactComponent as TrashIcon } from "@/assets/icons/trash.svg";

const ECommerceList = () => {
  const statusSelectId = useId();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const {
    data: list,
    status: queryStatus,
    isFetching,
    isLoading,
    isError,
  } = useQuery(
    ["products", { search: searchInputValue, status: statusFilter.join(",") }],
    getProducts,
    { keepPreviousData: true }
  );

  const queryClient = useQueryClient();
  const mutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const isResultFiltered =
    searchInputValue.trim() !== "" || statusFilter.length > 0;
  const products = list ? list.products : [];

  const handleStatusOnChange = (e: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = e;
    setStatusFilter(typeof value === "string" ? value.split(",") : value);
  };

  const handleSearchInputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInputValue(e.target.value);
  };

  const clearFilters = () => {
    setSearchInputValue("");
    setStatusFilter([]);
  };

  const rows = useMemo(
    () =>
      products.map((product: any) => ({
        id: product.id,
        product: {
          id: product.id,
          image: product.image,
          title: product.title,
        },
        createAt: product.createAt,
        status: product.status,
        price: product.price,
      })),
    [products]
  );

  const columns = useMemo<GridColumns>(
    () => [
      {
        flex: 1,
        field: "product",
        headerName: "Product",
        disableColumnMenu: true,
        sortComparator: (a, b) => {
          return a.title.localeCompare(b.title);
        },
        renderCell: (params: GridRenderCellParams<any>) => {
          const {
            value: { image, title },
          } = params;
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Box
                component="img"
                src={image}
                alt="product-img"
                sx={{ borderRadius: "0.75rem", width: 48, height: 48 }}
              />
              <Link variant="subtitle2" color="inherit" underline="hover">
                {title}
              </Link>
            </Box>
          );
        },
      },
      {
        width: 143,
        field: "createAt",
        headerName: "Create At",
        headerAlign: "center",
        align: "center",
        disableColumnMenu: true,
        sortComparator: gridDateComparator,
        valueFormatter: (params: GridValueFormatterParams<number>) => {
          return format(params.value, "dd MMM yyyy");
        },
      },
      {
        width: 180,
        field: "status",
        headerName: "Status",
        headerAlign: "center",
        align: "center",
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<any>) => {
          const variants: Record<
            number,
            { color: "error" | "warning" | "success"; title: string }
          > = {
            0: {
              color: "success",
              title: "In Stock",
            },
            1: {
              color: "warning",
              title: "Low Stock",
            },
            2: {
              color: "error",
              title: "Out Of Stock",
            },
          };

          return (
            <Chip
              color={variants[params.value].color}
              label={variants[params.value].title}
            />
          );
        },
      },
      {
        field: "price",
        headerName: "Price",
        width: 114,
        headerAlign: "center",
        align: "center",
        disableColumnMenu: true,
        valueFormatter: (params: GridValueFormatterParams<number>) => {
          return "$" + params.value;
        },
      },
      {
        field: "actions",
        type: "actions",
        width: 80,
        align: "center",
        disableColumnMenu: true,
        getActions: (params: any) => [
          <GridActionsCellItem
            icon={<TrashIcon />}
            label="Delete"
            showInMenu
          />,
          <GridActionsCellItem icon={<PenIcon />} label="Edit" showInMenu />,
        ],
      },
    ],
    []
  );

  return (
    <Card>
      <Box
        sx={{
          py: 24,
          px: 20,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 16,
        }}
      >
        <FormControl sx={{ width: { xs: "100%", md: 240 } }}>
          <InputLabel id={statusSelectId}>Status</InputLabel>
          <Select
            multiple
            labelId={statusSelectId}
            value={statusFilter}
            onChange={handleStatusOnChange}
            renderValue={(selected) => selected.join(", ")}
            input={<OutlinedInput label="Status" />}
            MenuProps={{
              sx: {
                "& .MuiList-root": {
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  p: 8,
                },
              },
            }}
          >
            {["In Stock", "Low Stock", "Out Of Stock"].map((statusName) => (
              <MenuItem key={statusName} value={statusName} sx={{ p: 0 }}>
                <Checkbox
                  checked={statusFilter.indexOf(statusName) > -1}
                  sx={{
                    "& svg": {
                      width: 20,
                      height: 20,
                    },
                  }}
                />
                <Typography variant="body2">{statusName}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          value={searchInputValue}
          onChange={handleSearchInputOnChange}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon width={20} height={20} />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1 }}
        />

        {isResultFiltered && (
          <Box flexShrink={0}>
            <Button
              color="error"
              variant="text"
              startIcon={<TrashIcon width={20} height={20} />}
              onClick={clearFilters}
            >
              Clear
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ opacity: isFetching && queryStatus === "success" ? 0.7 : 1 }}>
        <DataGrid
          autoHeight
          checkboxSelection
          disableSelectionOnClick
          columns={columns}
          rows={rows}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          rowHeight={80}
          hideFooterSelectedRowCount
        />
      </Box>
    </Card>
  );
};

export default ECommerceList;
