import { CircularProgress, IconButton, styled } from "@mui/material";
import { ReactComponent as PlusIcon } from "@/assets/icons/plus.svg";
import { ReactComponent as MinusIcon } from "@/assets/icons/minus.svg";

interface IQuantityInput {
  value: number;
  onChange: (value: number) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const SWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  minWidth: 96,
  padding: theme.spacing(4, 6),
  border: `1px solid rgba(145, 158, 171, 0.32)`,
  borderRadius: theme.borderRadius.lg,
}));

const SIconButton = styled(IconButton)({
  "&.Mui-disabled": {
    color: "rgba(145, 158, 171, 0.8)",
  },
});

const QuantityInput: React.FC<IQuantityInput> = (props) => {
  const handleIncreament = () => {
    const newValue = props.value + 1;
    props.onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = props.value === 1 ? 1 : props.value - 1;
    props.onChange(newValue);
  };

  return (
    <SWrapper>
      <SIconButton
        onClick={handleDecrement}
        size="small"
        disabled={props.value === 1 || props.isDisabled}
      >
        <MinusIcon width={16} height={16} />
      </SIconButton>
      {props.isLoading ? (
        <CircularProgress disableShrink size={15} color="inherit" />
      ) : (
        props.value
      )}
      <SIconButton onClick={handleIncreament} disabled={props.isDisabled}>
        <PlusIcon width={16} height={16} />
      </SIconButton>
    </SWrapper>
  );
};

export default QuantityInput;
