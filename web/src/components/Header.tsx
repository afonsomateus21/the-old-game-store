
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { HiSearchCircle, HiShoppingCart } from "react-icons/hi";
import Logo from "../assets/logo.png";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

export const Header =() => {
  const { toggleCart } = useCart();
  const { user } = useAuth();

  return (
    <Navbar 
      fluid
    >
      <NavbarBrand href="https://flowbite-react.com">
        <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
      </NavbarBrand>
      <div className="flex md:order-2">
        <button 
          className="relative p-2 rounded-lg hover:bg-gray-700 mr-2"
          onClick={ toggleCart }
        >
          <HiShoppingCart className="h-8 w-8 text-white" />
          <div className="absolute top-0 right-0 size-5 rounded-full bg-red-600 flex items-center justify-center">
            <span className="text-white">0</span>
          </div>
        </button>
        {
          user ?
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">name@flowbite.com</span>
            </DropdownHeader>
            <DropdownItem>Dashboard</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Earnings</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
          : <button className="text-white cursor-pointer underline">Login</button>
        }
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <div className="max-w-md">
          <TextInput id="search" type="text" rightIcon={HiSearchCircle} placeholder="Pesquisar..." />
        </div>
      </NavbarCollapse>
    </Navbar>
  );
}
