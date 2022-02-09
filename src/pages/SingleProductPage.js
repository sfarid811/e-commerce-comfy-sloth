import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {fetchSingleProductItem} from '../redux/actionsCreator';

const SingleProductPage = () => {
  const dispatch = useDispatch()
	let { id } = useParams()
	const history = useHistory()
  const {
		single_product: product,
		single_product_error: error,
		single_product_loading: loading,
	} = useSelector((state) => state.products)

	const {
		name,
		price,
		description,
		stock,
		stars,
		reviews,
		id: sku,
		company,
		images,
	} = product
  useEffect(() => {
		dispatch(fetchSingleProductItem(`${url}${id}`))
	}, [id])
  useEffect(() => {
		if (error) {
			setTimeout(() => {
				history.push('/')
			}, 3000)
		}
	}, [error])
  if (loading) {
		return <Loading />
	}

	if (error) {
		return <Error />
	}

 
  return (
    <Wrapper>
			<PageHero title={name} product />
			<div className='section section-center page'>
				<Link to='/products' className='btn'>
					back to products
				</Link>
				<div className='product-center'>
					<ProductImages images={images} />
					<section className='content'>
						<h2>{name}</h2>
						<Stars stars={stars} reviews={reviews} />
						<h5 className='price'>{formatPrice(price)}</h5>
						<p className='desc'>{description}</p>
						<p className='info'
						style={ stock > 0 ? { color:'hsl(209, 34%, 30%)'} : {color : 'hsl(360, 67%, 44%)'} }
						>
							<span>Available : </span>
							{stock > 0 ? 'In Stock' : 'out of stock'}
						</p>
						<p className='info'>
							<span>Sku : </span>
							{sku}
						</p>
						<p className='info'>
							<span>Brand : </span>
							{company}
						</p>
						<hr />
						{stock > 0 && <AddToCart product={product} />}
					</section>
				</div>
			</div>
		</Wrapper>
  );
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
