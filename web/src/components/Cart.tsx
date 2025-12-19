import { useCart } from "../hooks/useCart";
import { CartItem } from "./CartItem";
import { HiOutlineArrowLeft } from "react-icons/hi";

export const Cart = () => {
  const { isCartOpen, closeCart } = useCart();

  return (
    <div
      className={`
        fixed top-0 right-0 h-screen w-[400px]
        bg-white z-50 shadow-xl
        transform transition-transform duration-500 ease-in-out
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="h-full w-full relative">
        <section className="h-28 bg-black w-full flex items-center justify-evenly">
          <button className="cursor-pointer" onClick={closeCart}>
            <HiOutlineArrowLeft className="h-6 w-6" color="white" />
          </button>
          <h1 className="text-white text-2xl font-bold">
            Carrinho de compras
          </h1>
        </section>

        <section>
          <CartItem />
        </section>

        <section className="fixed bottom-0 h-32 w-full bg-black">

        </section>
      </div>
    </div>
  );
}