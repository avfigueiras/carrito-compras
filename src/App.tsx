import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { useCart } from "./hooks/useCart";

//Crear custom Hooks, deben seguir la regla useNombreDelHook, este solo tiene logica y no presentacion

function App() {
  //para usar el hook, creamos el objeto y dentro lo que estemos usando en el hook dentro del return
 const {data,cart,addToCart,deleteFromCart,increaseQuantity,decreaseQuantity,cleanCart,isEmptyCart, totals} = useCart()

  return (
    <>
      <Header
        cart={cart}
        deleteFromCart={deleteFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
        isEmptyCart={isEmptyCart}
        totals={totals}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => {
            return (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                addToCart={addToCart}
              />
            );
          })}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
