import { Link } from "react-router-dom"
import { Carousel, Image } from "react-bootstrap"
import Loader from "./Loader"
import Message from "./Message"
import {useGetTopProductsQuery} from '../slices/productsApiSlice'

const ProductCarousel = () => {

    const { data:products, isLoading, error } = useGetTopProductsQuery();
  return isLoading? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
  (
    <div style={{ blockSize:'400px' }}>
      <Carousel pause='hover' className='bg-primary mb-4'>
        {products.map((product) => (
          <Carousel.Item key={product._id} style={{ blockSize:'400px' }}>
            <Link to={`/product/${product._id}`}>
                <div style={{display:'flex', justifyContent: 'center'}}>
              <Image src={product.image} alt={product.name} fluid style={{ blockSize:'400px' }}/>
              </div>
              <Carousel.Caption className="carousel-caption" >
                <h2>{product.name} (${product.price})</h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default ProductCarousel