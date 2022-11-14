import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputBase,
  Radio,
  RadioGroup,
  Rating,
  Slider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { ReactComponent as FilterIcon } from "@/assets/icons/filter.svg";
import { ReactComponent as XIcon } from "@/assets/icons/x.svg";
import { ReactComponent as TrashIcon } from "@/assets/icons/trash.svg";

interface IProductsFiltersDrawer {
  minPrice: number;
  maxPrice: number;
}

const SColorCheckboxIcon = styled("div", {
  shouldForwardProp: (prop) => prop !== "checked",
})<{ checked?: boolean }>(({ theme, checked }) => ({
  width: 20,
  height: 20,
  borderRadius: "50%",
  backgroundColor: "currentcolor",
  transition: theme.transitions.create("transform", {
    duration: 150,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  }),
  ...(checked && {
    transform: "scale(1.4)",
  }),
}));

const SRangeInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: "rgba(145, 158, 171, 0.12)",
  borderRadius: theme.borderRadius.md,
  width: 55,
  marginLeft: theme.spacing(4),
  "& input": {
    padding: theme.spacing(4, 8, 4, 0),
    textAlign: "end",
  },
}));

const ProductsFiltersDrawer: React.FC<IProductsFiltersDrawer> = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRangeInputs, setPriceRangeInputs] = useState({
    min: searchParams.get("minPrice") || props.minPrice.toString(),
    max: searchParams.get("maxPrice") || props.maxPrice.toString(),
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (
        priceRangeInputs.min !== props.minPrice.toString() ||
        priceRangeInputs.max !== props.maxPrice.toString()
      ) {
        if (
          !priceRangeInputs.min ||
          Number(priceRangeInputs.min) < props.minPrice
        ) {
          searchParams.delete("minPrice");
        } else {
          searchParams.set("minPrice", priceRangeInputs.min);
        }

        if (
          !priceRangeInputs.max ||
          Number(priceRangeInputs.max) > props.maxPrice
        ) {
          searchParams.delete("maxPrice");
        } else {
          searchParams.set("maxPrice", priceRangeInputs.max);
        }

        setSearchParams(searchParams);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [priceRangeInputs.min, priceRangeInputs.max]);

  const toggleDrawer = (isOpen: boolean) => {
    setIsDrawerOpen(isOpen);
  };

  const toggleSearchParamsArrayValue = (name: string, value: string) => {
    let params = searchParams.getAll(name);
    const valueIndex = params.findIndex((paramValue) => paramValue === value);
    if (valueIndex > -1) {
      params.splice(valueIndex, 1);
    } else {
      params.push(value);
    }
    return params;
  };

  const handleGenderChange = (val: string) => {
    let newGender = toggleSearchParamsArrayValue("gender", val);
    searchParams.delete("gender");
    newGender.forEach((gender) => {
      searchParams.append("gender", gender);
    });
    setSearchParams(searchParams);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set("category", e.target.value);
    setSearchParams(searchParams);
  };

  const handlePriceSliderChange = (e: Event, newVal: number | number[]) => {
    setPriceRangeInputs({
      min: (newVal as number[])[0].toString(),
      max: (newVal as number[])[1].toString(),
    });
  };

  const handleWhenPriceSliderCommitted = () => {
    searchParams.set("minPrice", priceRangeInputs.min);
    searchParams.set("maxPrice", priceRangeInputs.max);
    setSearchParams(searchParams);
  };

  const handelPriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (Number(value) < props.minPrice) {
      value = props.minPrice.toString();
    }
    if (Number(value) > props.maxPrice) {
      value = props.maxPrice.toString();
    }

    setPriceRangeInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: Number(value),
    }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newColor = toggleSearchParamsArrayValue("color", e.target.value);
    searchParams.delete("color");
    newColor.forEach((color) => {
      searchParams.append("color", color);
    });
    setSearchParams(searchParams);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set("rating", e.target.value);
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <>
      <Button
        variant="text"
        color="inherit"
        endIcon={<FilterIcon />}
        onClick={() => toggleDrawer(true)}
      >
        Filters
      </Button>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 16,
            pl: 16,
            pr: 8,
          }}
        >
          <Typography variant="subtitle1">Filters</Typography>
          <IconButton onClick={() => toggleDrawer(false)}>
            <XIcon width={20} height={20} />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 16, p: 20 }}>
          <Box display="flex" flexDirection="column">
            <Typography variant="subtitle1" mb={8}>
              Gender
            </Typography>
            {["Men", "Women", "Kids"].map((label) => (
              <FormControlLabel
                key={label}
                label={label}
                control={
                  <Checkbox
                    checked={
                      searchParams.getAll("gender") &&
                      searchParams.getAll("gender").includes(label)
                    }
                    onChange={() => handleGenderChange(label)}
                  />
                }
                sx={{ ml: "-11px" }}
              />
            ))}
          </Box>

          <div>
            <Typography variant="subtitle1" mb={8}>
              Category
            </Typography>
            <RadioGroup
              aria-labelledby=""
              name=""
              value={searchParams.get("category")}
              onChange={handleCategoryChange}
            >
              {[
                { label: "All", value: "all" },
                { label: "Shose", value: "shose" },
                { label: "Apparel", value: "apparel" },
                { label: "Accessories", value: "accessories" },
              ].map((controlLabel) => (
                <FormControlLabel
                  key={controlLabel.label}
                  label={controlLabel.label}
                  value={controlLabel.value}
                  control={<Radio />}
                  sx={{ ml: "-11px" }}
                />
              ))}
            </RadioGroup>
          </div>

          <div>
            <Typography variant="subtitle1" mb={8}>
              Color
            </Typography>
            <Box maxWidth={144}>
              {[
                "rgb(0, 171, 85)",
                "rgb(0, 0, 0)",
                "rgb(179, 0, 255)",
                "rgb(255, 192, 203)",
                "rgb(255, 72, 66)",
                "rgb(24, 144, 255)",
                "rgb(148, 216, 45)",
                "rgb(255, 193, 7)",
              ].map((color) => (
                <Checkbox
                  key={color}
                  icon={<SColorCheckboxIcon />}
                  checkedIcon={<SColorCheckboxIcon checked />}
                  value={color}
                  checked={
                    searchParams.getAll("color") &&
                    searchParams.getAll("color").includes(color)
                  }
                  onChange={handleColorChange}
                  sx={{
                    color,
                    "&.Mui-checked": {
                      color,
                    },
                  }}
                />
              ))}
            </Box>
          </div>

          <Stack spacing={8}>
            <Typography variant="subtitle1">Price</Typography>
            <Box sx={{ display: "flex", gap: 16 }}>
              <Box>
                <Typography variant="caption" fontWeight={700} color="gray.500">
                  Min ($)
                </Typography>
                <SRangeInput
                  type="number"
                  name="min"
                  value={priceRangeInputs.min}
                  onChange={handelPriceInputChange}
                  inputProps={{
                    step: "10",
                    min: props.minPrice,
                    max: props.maxPrice,
                  }}
                />
              </Box>
              <Box>
                <Typography variant="caption" fontWeight={700} color="gray.500">
                  Max ($)
                </Typography>
                <SRangeInput
                  type="number"
                  name="max"
                  value={priceRangeInputs.max}
                  onChange={handelPriceInputChange}
                  inputProps={{
                    step: "10",
                    min: props.minPrice,
                    max: props.maxPrice,
                  }}
                />
              </Box>
            </Box>
            <Slider
              marks
              step={10}
              min={props.minPrice}
              max={props.maxPrice}
              size="small"
              value={[
                Number(priceRangeInputs.min),
                Number(priceRangeInputs.max),
              ]}
              onChange={handlePriceSliderChange}
              onChangeCommitted={handleWhenPriceSliderCommitted}
              valueLabelDisplay="auto"
              sx={{ width: "calc(100% - 20px)", alignSelf: "center" }}
            />
          </Stack>

          <div>
            <Typography variant="subtitle1" mb={8}>
              Price
            </Typography>
            <FormGroup>
              {["4", "3", "2", "1"].map((value) => (
                <FormControlLabel
                  key={value}
                  label={<Typography variant="body2">& Up</Typography>}
                  labelPlacement="end"
                  control={
                    <Radio
                      disableRipple
                      value={value}
                      onChange={handleRatingChange}
                      name="filterby-rating"
                      icon={<Rating value={Number(value)} readOnly />}
                      checkedIcon={<Rating value={Number(value)} readOnly />}
                      sx={{
                        backgroundColor: "transparent",
                        "&:hover": { backgroundColor: "transparent" },
                      }}
                    />
                  }
                  sx={(theme) => ({
                    backgroundColor:
                      searchParams.get("rating") === value
                        ? "rgb(145, 158, 171, 0.16)"
                        : "transparent",
                    borderRadius: theme.borderRadius.lg,
                  })}
                />
              ))}
            </FormGroup>
          </div>
        </Box>
        <Box p={20}>
          <Badge
            variant="dot"
            color="error"
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            sx={{ width: "100%" }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={clearFilters}
              startIcon={<TrashIcon width={20} height={20} />}
              fullWidth
            >
              Clear
            </Button>
          </Badge>
        </Box>
      </Drawer>
    </>
  );
};

export default ProductsFiltersDrawer;
