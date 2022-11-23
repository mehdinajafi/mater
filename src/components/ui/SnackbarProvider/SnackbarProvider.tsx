import { SnackbarProvider as NotistackSnackbarProvider } from "notistack";
import { ReactComponent as CheckIcon } from "@/assets/icons/check-solid-rounded.svg";
import { ReactComponent as InfoIcon } from "@/assets/icons/info-solid-rounded.svg";
import { ReactComponent as AlertIcon } from "@/assets/icons/alert-triangle-solid.svg";

interface ISnackbarProvider {
  children: React.ReactNode;
}

const SnackbarProvider: React.FC<ISnackbarProvider> = ({ children }) => {
  return (
    <NotistackSnackbarProvider
      anchorOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      iconVariant={{
        success: (
          <div className="icon-wrapper">
            <CheckIcon width={24} height={24} />
          </div>
        ),
        info: (
          <div className="icon-wrapper">
            <InfoIcon width={24} height={24} />
          </div>
        ),
        error: (
          <div className="icon-wrapper">
            <InfoIcon width={24} height={24} />
          </div>
        ),
        warning: (
          <div className="icon-wrapper">
            <AlertIcon width={24} height={24} />
          </div>
        ),
      }}
    >
      {children}
    </NotistackSnackbarProvider>
  );
};

export default SnackbarProvider;
