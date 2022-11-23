import React, { useState, useId, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
  Skeleton,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  gridDateComparator,
  GridRenderCellParams,
  GridRowParams,
  GridSelectionModel,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import HeaderToolbar from "./HeaderToolbar";
import DeleteProductDialog from "./DeleteProductDialog";
import getProducts from "@/api/e-commerce/getProducts";
import IProduct, { ProductStatus } from "../interface/product";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as PenIcon } from "@/assets/icons/pen.svg";
import { ReactComponent as TrashIcon } from "@/assets/icons/trash.svg";

const statusVariants: Record<
  number,
  {
    title: string;
    color: "success" | "warning" | "error";
  }
> = {
  [ProductStatus.InStock]: {
    title: "In Stock",
    color: "success",
  },
  [ProductStatus.LowStock]: {
    title: "Low Stock",
    color: "warning",
  },
  [ProductStatus.OutOfStock]: {
    title: "Out Of Stock",
    color: "error",
  },
};

const ECommerceList = () => {
  const statusSelectId = useId();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [pageSize, setPageSize] = useState(5);

  const {
    data,
    status: queryStatus,
    isFetching,
    isLoading,
  } = useQuery(
    ["products", { search: searchInputValue, statuses: statusFilter }],
    getProducts,
    { keepPreviousData: true, staleTime: Infinity, refetchOnWindowFocus: false }
  );

  const isResultFiltered =
    searchInputValue.trim() !== "" || statusFilter.length > 0;
  const products = data ? data.products : [];

  const handleStatusOnChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value;
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

  const handleSelectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelected = rows.map((row: any) => row.id);
      setSelectionModel(newSelected);
      return;
    }
    setSelectionModel([]);
  };

  const rows = useMemo(
    () =>
      products.map((product: IProduct) => ({
        id: product.id,
        product: {
          id: product.id,
          image: product.image,
          title: product.title,
          uri: product.url.uri,
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
            value: { image, title, uri },
          } = params;
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Box
                component="img"
                src={image}
                alt="product-img"
                sx={{ borderRadius: "0.75rem", width: 48, height: 48 }}
              />
              <Link
                component={RouterLink}
                to={uri}
                variant="subtitle2"
                color="inherit"
                underline="hover"
              >
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
          return (
            <Chip
              color={statusVariants[params.value].color}
              label={statusVariants[params.value].title}
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
        getActions: (params: GridRowParams) => {
          const navigate = useNavigate();
          const [isModalOpen, setIsModalOpen] = useState(false);

          const goToEditProduct = () => {
            navigate(`/e-commerce/product/${params.id}/edit`);
          };

          return [
            <DeleteProductDialog
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              selectionModel={[params.id]}
            />,
            <GridActionsCellItem
              icon={<TrashIcon width={20} height={20} />}
              label="Delete"
              showInMenu
              onClick={() => setIsModalOpen(true)}
              sx={{
                color: "error.main",
                "& .MuiListItemIcon-root": {
                  color: "inherit",
                },
              }}
            />,
            <GridActionsCellItem
              icon={<PenIcon width={20} height={20} />}
              label="Edit"
              showInMenu
              onClick={goToEditProduct}
              sx={{
                "& .MuiListItemIcon-root": {
                  color: "inherit",
                },
              }}
            />,
          ];
        },
      },
    ],
    []
  );

  return (
    <Card sx={{ position: "relative" }}>
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
            renderValue={(selected) => {
              const titles = selected.map(
                (select) => statusVariants[Number(select)].title
              );
              return titles.join(", ");
            }}
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
            {Object.entries(statusVariants).map(([val, status]) => (
              <MenuItem key={val} value={val} sx={{ p: 0 }}>
                <Checkbox
                  checked={statusFilter.indexOf(val) > -1}
                  sx={{
                    "& svg": {
                      width: 20,
                      height: 20,
                    },
                  }}
                />
                <Typography variant="body2">{status.title}</Typography>
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

      <Box
        sx={{
          opacity: isFetching && queryStatus === "success" ? 0.7 : 1,
        }}
      >
        <HeaderToolbar
          selectionModel={selectionModel}
          onSelectAllClick={handleSelectAllClick}
          rowCount={rows.length}
        />
        {isLoading ? (
          <LoadingDataGrid />
        ) : (
          <DataGrid
            autoHeight
            checkboxSelection
            disableSelectionOnClick
            hideFooterSelectedRowCount
            columns={columns}
            rows={rows}
            rowHeight={80}
            rowsPerPageOptions={[5, 10, 25]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => {
              setPageSize(newPageSize);
            }}
            selectionModel={selectionModel}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
          />
        )}
      </Box>
    </Card>
  );
};

// -------------------- Loading DataGrid -------------------- //
const loadingDataGrid: {
  columns: GridColumns;
  rows: any;
} = {
  columns: [
    {
      flex: 1,
      field: "product",
      headerName: "Product",
      renderCell: () => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Skeleton variant="rounded" width={48} height={48} />
            <Skeleton
              variant="text"
              width={200}
              sx={{ fontSize: "0.875rem" }}
            />
          </Box>
        );
      },
    },
    {
      field: "createAt",
      headerName: "Create At",
      width: 143,
      headerAlign: "center",
      align: "center",
      renderCell: () => (
        <Skeleton variant="text" width={100} sx={{ fontSize: "0.875rem" }} />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: () => (
        <Skeleton variant="text" width={80} sx={{ fontSize: "0.875rem" }} />
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: 114,
      headerAlign: "center",
      align: "center",
      renderCell: () => (
        <Skeleton variant="text" width={50} sx={{ fontSize: "0.875rem" }} />
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 80,
    },
  ],
  rows: Array(5)
    .fill("")
    .map((_, index) => ({
      id: index,
      product: "",
      createAt: "",
      status: "",
      price: "",
    })),
};

const LoadingDataGrid = () => {
  return (
    <DataGrid
      autoHeight
      checkboxSelection
      isRowSelectable={() => false}
      disableSelectionOnClick
      hideFooterSelectedRowCount
      columns={loadingDataGrid.columns}
      rows={loadingDataGrid.rows}
      rowHeight={80}
    />
  );
};

export default ECommerceList;
