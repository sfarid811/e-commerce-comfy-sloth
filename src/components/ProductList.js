import React, { useEffect } from "react";
import GridView from "./GridView";
import ListView from "./ListView";
import { useSelector, useDispatch } from "react-redux";
import { sortProducts, applyFilters } from "../redux/slices/filterSlice";

const ProductList = () => {
  const {
    filtered_products: products,
    grid_view,
    sort,
    filters,
  } = useSelector(state => state.filter);

 

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sortProducts());
  }, [sort]);

  useEffect(() => {
    dispatch(applyFilters());
  }, [filters]);

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry,no products matched your search...
      </h5>
    );
  }

  if (grid_view) {
    return <ListView products={products} />;
  }
  return <GridView products={products}></GridView>;
};

export default ProductList;
