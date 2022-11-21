import React from "react";
import { Box, Checkbox, styled } from "@mui/material";
import { ReactComponent as CheckIcon } from "@/assets/icons/check.svg";

interface IColorCheckbox {
  colorCode: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SColorCheckboxIcon = styled(Box, {
  shouldForwardProp: (prop) => prop !== "colorCode" && prop !== "checked",
})<{
  checked?: boolean;
  colorCode: string;
}>(({ theme, checked, colorCode }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 20,
  height: 20,
  borderRadius: "50%",
  backgroundColor: colorCode,
  transition: theme.transitions.create("transform", {
    duration: 150,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  }),
  "& svg": {
    display: "none",
  },

  ...(checked && {
    transform: "scale(1.4)",
    "& svg": {
      display: "block",
      color: "#fff",
    },
  }),

  ...(colorCode === "rgb(255, 255, 255)" && {
    border: `1px solid  rgba(145, 158, 171, 0.24)`,
    boxShadow: "rgb(145 158 171 / 24%) 4px 4px 8px 0px",
    "& svg": {
      color: "rgb(0, 0, 0)",
    },
  }),
}));

const SColorShaddow = styled("div")(() => ({
  width: "100%",
  height: "100%",
  opacity: "0.48",
  borderRadius: "50%",
  position: "absolute",
  boxShadow: "currentcolor 4px 4px 8px 0px",
}));

const ColorCheckbox: React.FC<IColorCheckbox> = (props) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e);
  };

  return (
    <Checkbox
      value={props.value}
      checked={props.checked}
      onChange={handleOnChange}
      icon={<SColorCheckboxIcon colorCode={props.colorCode} />}
      checkedIcon={
        <SColorCheckboxIcon colorCode={props.colorCode} checked>
          <SColorShaddow />
          <CheckIcon width={12} height={12} />
        </SColorCheckboxIcon>
      }
      sx={{
        color: props.colorCode,
        "&.Mui-checked": {
          color: props.colorCode,
        },
      }}
    />
  );
};

export default ColorCheckbox;
