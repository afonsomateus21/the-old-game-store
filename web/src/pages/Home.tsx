import { Header } from "../components/Header"
import { CustomBanner } from "../components/Banner"
import { Cart } from "../components/Cart"
import { useCart } from "../hooks/useCart"
import { CardBanner } from "../components/CardBanner"
import { ProductCard } from "../components/ProductCard"
import { useProduct } from "../hooks/useProduct"

export const Home = () => {
  const { isCartOpen, closeCart } = useCart();
  const { products } = useProduct();

  return (
    <div className="flex flex-col bg-home relative min-h-screen">
      <Header />
      <CustomBanner />
      {
        isCartOpen && (
          <div
            className="fixed inset-0 bg-black/80 z-40"
            onClick={ closeCart }
          />
        )
      }
      <Cart />
      <section className="w-full h-[500px] flex justify-center gap-7 p-8 flex-wrap">
        <CardBanner />
        <CardBanner />
        <CardBanner />
        <CardBanner />
      </section>

      <section className="w-full h-auto mt-12 flex justify-center p-5">
        <div className="grid grid-cols-3 gap-9">
          {
            products.map((product) => (
              <ProductCard 
                key={product.id}
                product={product}
              />
            ))
          }
        </div>
      </section>
    </div>
  )
}