import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const Product = () => {
  const {id} = useParams()
  const url = `http://localhost:3000/products/${id}`
  const {data: product, loading, error} = useFetch(url)

 return (
   <div>
     <h1>Product</h1>
     <p>ID  do produto: {id}</p>
     {error && <p>Ocorreu um erro...</p>}
     {loading && <p>Crregando dados...</p>}
     {product && (
      <div>
        <h1>{product.name}</h1>
        <p>{product.price}</p>
        <Link to={`/products/${id}/info`}>Mais informações</Link>
      </div>
     )}
   </div>
 );
}

export default Product