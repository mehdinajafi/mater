import { MenuItem, MenuList, Typography } from "@mui/material";
import { Langs } from "@/store/Language";
import { useAppStore } from "@/store";
import { languages } from "./LanguageDropdown";

interface ILanguageDropdownMenu {
  onClose: () => void;
}

const LanguageDropdownMenu: React.FC<ILanguageDropdownMenu> = (props) => {
  const { onClose } = props;
  const selectedLanguage = useAppStore((store) => store.language);
  const setLanguage = useAppStore((store) => store.setLanguage);

  const handleClickOnItem = (lang: Langs) => {
    setLanguage(lang);
    onClose();
  };

  return (
    <MenuList sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {Object.entries(languages).map(([lang, { flag, name }]) => (
        <MenuItem
          key={lang}
          onClick={() => handleClickOnItem(lang as Langs)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            bgcolor:
              selectedLanguage === lang ? "action.attention" : "transparent",
          }}
        >
          <img src={flag} width={28} height={20} alt={lang} />
          <Typography variant="body2">{name}</Typography>
        </MenuItem>
      ))}
    </MenuList>
  );
};

export default LanguageDropdownMenu;
