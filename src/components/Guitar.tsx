import type { Guitar} from '../types/types'
// creando el type para las props de tipo separado y luego le decimos que es de ee tipo en las props
type GuitarProps = {
  guitar:Guitar,
  addToCart: (item:Guitar)=>void
}
//vamos a pasar como prop tambien la funcion de setCart que modificará el estado del carrito de compras,como pasamos una funcion addToCart ya no usamos la setCart
/*usando TS puedes tener inline type o separate type. El inline es poniendo en la destructuring el tipo de dato dentro de
los parametros de la funcion quedando asi {guitar, addToCart}:{guitar:Guitar,addToCart: (item:Guitar)=>void}, el tipo void
es cuando una funcion no retorna nada*/
export default function Guitar({guitar, addToCart}: GuitarProps) {
  const { name, price, description, image} = guitar
 
  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`/img/${image}.jpg`}
          alt="imagen guitarra"
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">${price}</p>
        <button type="button" className="btn btn-dark w-100" onClick={()=> addToCart(guitar)}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
