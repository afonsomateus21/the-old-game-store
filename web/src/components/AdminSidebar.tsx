import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarLogo } from "flowbite-react";
import { HiChartPie, HiLogout, HiShoppingBag, HiUser, HiViewBoards } from "react-icons/hi";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

export const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  }
  return (
    <Sidebar aria-label="Sidebar with logo branding example">
      <SidebarLogo href="#" img="/logo.png" imgAlt="The Old Game logo">
        The Old Game
      </SidebarLogo>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem href="/admin/products" icon={HiShoppingBag}>
            Produtos
          </SidebarItem>
          <SidebarItem href="/admin/categories" icon={HiViewBoards}>
            Categorias
          </SidebarItem>
          <SidebarItem href="#" icon={HiChartPie}>
            Relatórios
          </SidebarItem>
          <SidebarItem href="/admin/profile" icon={HiUser}>
            Usuário
          </SidebarItem>
          <SidebarItem href="#" icon={HiLogout}>
            <button onClick={handleLogout}>
              Sign Out
            </button>
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
