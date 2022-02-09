import React, {useEffect} from 'react';
import styled from 'styled-components';
import { Filters, ProductList, Sort, PageHero, Loading, Error } from '../components';
import {fetchFilterProducts} from '../redux/actionsCreator';
import { useDispatch, useSelector } from 'react-redux';
import { products_url as url } from '../utils/constants';
 
const ProductsPage = () => {
  const dispatch = useDispatch();
  const { get_products_loading: loading, get_products_error: error } =
		useSelector(state => state.filter)

   
    useEffect(() => {
      dispatch(fetchFilterProducts(url));
    }, [])
  
    if (loading) {
      return <Loading />
    }
    if (error) {
      return <Error />
    }
  return (
    <main>
			<PageHero title='products' />
			<Wrapper className='page'>
				<div className='section-center products'>
					<Filters />
					<div>
						<Sort />
						<ProductList />
					</div>
				</div>
			</Wrapper>
		</main>
  );
}

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`

export default ProductsPage
