import { useCallback, useState } from "react";

const useAnchorDisclosure = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const onClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onOpen = useCallback((element: HTMLElement) => {
    setAnchorEl(element);
  }, []);

  const onToggle = useCallback(
    (element?: HTMLElement) => {
      if (isOpen) {
        setAnchorEl(null);
      } else {
        if (element) {
          setAnchorEl(element);
        }
      }
    },
    [isOpen, onClose, onOpen]
  );

  return { isOpen, anchorEl, onClose, onOpen, onToggle };
};

export default useAnchorDisclosure;
