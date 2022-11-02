import { NavLink as BaseNavLink } from "react-router-dom";
import NavItem from "./NavItem";

interface INavLink {
  to: string;
  text: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<INavLink> = (props) => {
  return (
    <BaseNavLink to={props.to} end>
      {({ isActive }) => (
        <NavItem
          isActive={isActive}
          text={props.text}
          icon={props.icon}
          onClick={props.onClick}
        />
      )}
    </BaseNavLink>
  );
};

export default NavLink;
