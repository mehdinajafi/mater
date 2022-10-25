import { Menu, IconButton, Typography, MenuItem, Stack } from "@mui/material";
import useAnchorDisclosure from "@/hooks/useAnchorDisclosure";
import { useAppStore } from "@/store";
import { Langs } from "@/store/Language";
import { ReactComponent as FaFlag } from "@/assets/flags/fa.svg";
import { ReactComponent as EnFlag } from "@/assets/flags/en.svg";

const languages: Record<Langs, { name: string; flag: React.ReactNode }> = {
  en: {
    name: "English",
    flag: <EnFlag />,
  },
  fa: {
    name: "Persian",
    flag: <FaFlag width={28} height={20} />,
  },
};

const LanguageDropdown = () => {
  const selectedLanguage = useAppStore((store) => store.language);
  const setLanguage = useAppStore((store) => store.setLanguage);
  const { anchorEl, isOpen, onToggle, onClose } = useAnchorDisclosure();

  const handleClickOnItem = (lang: Langs) => {
    setLanguage(lang);
    onClose();
  };

  return (
    <>
      <IconButton
        onClick={(e) => onToggle(e.currentTarget)}
        sx={{ width: 40, height: 40 }}
      >
        {languages[selectedLanguage].flag}
      </IconButton>

      <Menu
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
        <Stack direction="column" spacing={6}>
          {Object.entries(languages).map(([key, val]) => (
            <MenuItem
              key={key}
              onClick={() => handleClickOnItem(key as Langs)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                bgcolor:
                  selectedLanguage === key ? "action.attention" : "transparent",
              }}
            >
              {val.flag}
              <Typography variant="body2">{val.name}</Typography>
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
};

export default LanguageDropdown;
