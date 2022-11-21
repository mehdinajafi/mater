import { useState } from "react";
import {
  Autocomplete,
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { useQuery } from "@tanstack/react-query";
import getProducts from "@/api/e-commerce/getProducts";
import IProduct from "../interface/product";

const SearchBar = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const { data, isFetching } = useQuery(
    ["products", { search: inputValue }],
    getProducts,
    {
      keepPreviousData: true,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Autocomplete
      autoHighlight
      inputValue={inputValue}
      onInputChange={(e, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(e, option) => {
        if (option) {
          navigate(option.url.uri);
        }
      }}
      options={data ? data.products : []}
      getOptionLabel={(option: IProduct) => option.title}
      noOptionsText={
        <Stack alignItems="center" textAlign="center" px={10}>
          <Typography variant="subtitle1" color="gray.800">
            Not Found
          </Typography>
          <Typography variant="body2" color="gray.800" mt={10}>
            No Results found for <strong>"{inputValue}"</strong>
          </Typography>
          <Typography variant="body2" color="gray.800">
            Try checking for typos or using complete words.
          </Typography>
        </Stack>
      }
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={(theme) => ({
            "&.MuiAutocomplete-option": {
              px: 5,
              mx: 5,
              fontSize: "0.875rem",
              borderRadius: theme.borderRadius.lg,
              opacity: isFetching ? 0.75 : 1,
            },
            "& > img": {
              mr: 10,
              flexShrink: 0,
              borderRadius: theme.borderRadius.lg,
              objectFit: "cover",
            },
          })}
          {...props}
        >
          <img loading="lazy" width={50} src={option.image} alt="product img" />
          {option.title}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          color="gray"
          InputProps={{
            ...params.InputProps,
            endAdornment: false,
            startAdornment: (
              <InputAdornment position="end">
                <SearchIcon width={20} height={20} />
              </InputAdornment>
            ),
          }}
        />
      )}
      sx={{
        width: 300,
        "& .MuiOutlinedInput-root.MuiAutocomplete-inputRoot": {
          py: 5,
          pl: 0,
          pr: 8,
        },
      }}
    />
  );
};

export default SearchBar;
