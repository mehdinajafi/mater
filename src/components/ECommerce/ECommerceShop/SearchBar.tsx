import React, { useState } from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || ""
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue) {
      searchParams.set("search", inputValue);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", alignItems: "center", gap: 16 }}
    >
      <TextField
        placeholder="Search..."
        value={inputValue}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ flexShrink: 0 }}>
              <IconButton type="submit">
                <SearchIcon width={20} height={20} />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            pr: 5,
          },
          inputProps: {
            sx: {
              py: 12,
            },
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
