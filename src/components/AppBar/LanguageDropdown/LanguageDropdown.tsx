import { lazy, Suspense, Fragment } from "react";
import { IconButton, Popover } from "@mui/material";
import useAnchorDisclosure from "@/hooks/useAnchorDisclosure";
import { useAppStore } from "@/store";
import { languages } from "@/store/Language";
import DropdownLoading from "../DropdownLoading";

const LanguageDropdownContent = lazy(() => import("./LanguageDropdownContent"));

const LanguageDropdown = () => {
  const selectedLanguage = useAppStore((store) => store.language);
  const { anchorEl, isOpen, onToggle, onClose } = useAnchorDisclosure();

  return (
    <Fragment>
      <IconButton
        onClick={(e) => onToggle(e.currentTarget)}
        sx={{ width: 40, height: 40 }}
      >
        <img
          src={languages[selectedLanguage].flag}
          width={28}
          height={20}
          alt={selectedLanguage}
        />
      </IconButton>

      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: 180,
            p: 8,
          },
        }}
      >
        <Suspense fallback={<DropdownLoading />}>
          <LanguageDropdownContent onClose={onClose} />
        </Suspense>
      </Popover>
    </Fragment>
  );
};

export default LanguageDropdown;
