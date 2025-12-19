import { RouterProvider } from "react-router";
import { router } from "./routes";
import { createTheme, ThemeProvider } from "flowbite-react";
import { CartProvider } from "./hooks/useCart";
import { AuthProvider } from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";
import { CategoryProvider } from "./hooks/useCategory";
import { ProductProvider } from "./hooks/useProduct";

const customTheme = createTheme({
  navbar: {
    root: {
      base: "bg-black dark:bg-black px-2 py-2.5 sm:px-4"
    }
  },
  table: {
    body: {
      cell: {
        base: "text-black"
      }
    },
    row: {
      base: "bg-white dark:bg-white",
      hovered: "hover:bg-gray-800 dark:hover:bg-gray-200"
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider>
        <CategoryProvider>
          <ProductProvider>
            <CartProvider>
              <RouterProvider router={router} />
              <ToastContainer />
            </CartProvider>
          </ProductProvider>
        </CategoryProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
