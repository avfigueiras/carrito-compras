// se crea como types.d.ts siendo la d una especificacion de definitions
/* En TS hay dos tipos: type e interfaces, se ponen delante del nombre del tipo de dato que vas a definir */
export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

//cartitem tiene todos los atributos de guitar mas la prop de quantity, por lo que se aplica la herencia
export type CartItem = Guitar & {
    quantity: number
}

//tambien puedes generar una interfaz que herede del type pero la sintaxis cambia y usa la palabra extends
export interface CartItem1 extends Guitar {
    quantity: number
}

/*Otra forma es usando el utility Types,donde puedes seleccionar solo algunos algunos elementos y mantener
 los tipos de dato de otro type. solo es aplicable a los type podemos ver la sintaxis de Pick(permite utilizar 
 algunos elementos y otros no) y omit(es similar al pick pero va a quitar los que pases y deja los demas ) */
 //ejemplo con el pick vamos a usar id, name y price, primero ponemos <TipoDelQueUsamosLosElementos, 'elemento1' | 'elemento2'>
 /*si quieres  agregar atributos extra  pones despes de <TipoDelQueUsamosLosElementos, 'elemento1' | 'elemento2'> & {
    marca:string
 }
  */
 export type CartItemPick = Pick<Guitar, 'id' | 'name' | 'price'> & {
    quantity: number
 }

 /*para generar un tipo para el id de la guitarra usamos igual el pick para seleccionar el elemento id de la guitarra,
 la otra forma es con lookup, que seria  export type GuitarId1 = Guitar ['id'], lo usamos directamente en este caso 
 por lo que no generamos el tipo de dato*/
 export type GuitarId = Pick<Guitar, 'id'> 


