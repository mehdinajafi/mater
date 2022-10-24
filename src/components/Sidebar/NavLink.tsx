import { NavLink as BaseNavLink } from "react-router-dom";
import NavItem, { INavItem } from "./NavItem";

interface INavLink {
  to: string;
  text: string;
  icon: React.ReactNode;
}

const NavLink: React.FC<INavLink> = (props) => {
  return (
    <BaseNavLink to={props.to} end>
      {({ isActive }) => (
        <NavItem isActive={isActive} text={props.text} icon={props.icon} />
      )}
    </BaseNavLink>
  );
};

export default NavLink;
