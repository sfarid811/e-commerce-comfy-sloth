import React from "react";
import styled from "styled-components";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { update_filters, clearFilters } from "../redux/slices/filterSlice";

const Filters = () => {
  const { filters, all_products } = useSelector((state) => state.filter);
  const { category, color, company, max_price, min_price, price, shipping } =
    filters;

  const dispatch = useDispatch();
  // console.log(filters)

  let debounceTimeout = 0;

  const debounceSearch = (e) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      //console.log(e.target.value);
      dispatch(update_filters(e));
    }, 300);
  };

  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");
  const colors = getUniqueValues(all_products, "colors");

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search over here"
              className="search-input"
              onChange={(e) => {
                debounceSearch(e);
              }}
            />
          </div>
          {/* end of search input*/}
          {/* categories */}
          <div className="form-control">
            <h5>category</h5>
            <div>
              {/* c means category */}
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(update_filters(e));
                    }}
                    type="button"
                    name="category"
                    className={`${
                      category === c.toLowerCase() ? "active" : null
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of categories */}
          {/* companies */}
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              value={company}
              onChange={(e) => {
                e.preventDefault();
                dispatch(update_filters(e));
              }}
              className="company"
            >
              {/* c means company */}
              {companies.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end of companies */}

          {/* colors */}
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {/* c means color */}
              {colors.map((c, index) => {
                if (c === "all") {
                  return (
                    <button
                      key={index}
                      name="color"
                      data-color="all"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(update_filters(e));
                      }}
                      className={`${
                        color === "all" ? "active all-btn" : "all-btn"
                      }`}
                    >
                      All
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name="color"
                    data-color={c}
                    style={{ background: c }}
                    className={`${
                      color === c ? "active color-btn" : "color-btn"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(update_filters(e));
                    }}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/*end of  colors */}

          {/* price */}
          <div className="form-control">
            <h5>price</h5>
            <div className="price">{formatPrice(price)}</div>
            <div className="box">
              <input
                className="slider"
                type="range"
                name="price"
                value={price}
                onChange={(e) => {
                  dispatch(update_filters(e));
                }}
                min={min_price}
                max={max_price}
              />
            </div>
            {/* end of price */}
            {/* shipping */}
            <div className="form-control shipping">
              <label htmlFor="shipping"> free shipping</label>
              <input
                type="checkbox"
                name="shipping"
                id="shipping"
                onChange={(e) => dispatch(update_filters(e))}
                checked={shipping}
              />
            </div>
            {/* end of shipping */}
          </div>
        </form>

        {/* clear filters */}
        <button
          type="button"
          className="clear-btn"
          onClick={() => dispatch(clearFilters())}
        >
          clear filter
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 1.2rem;
  }
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    max-width: 280px;
    padding: 20px 10px;
    border-radius: 5px;
    box-shadow: -2px -2px 8px rgba(255, 255, 255, 1),
      -2px -2px 12px rgba(255, 255, 255, 0.5),
      inset 2px 2px 4px rgba(255, 255, 255, 0.1), 2px 2px 8px rgba(0, 0, 0, 0.3);
  }
  .slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 10px;
    border: none;
    border-radius: 5px;
    background-color: #ecf0f3;
    box-shadow: inset -2px -2px 8px rgba(255, 255, 255, 1),
      inset -2px -2px 12px rgba(255, 255, 255, 0.5),
      inset 2px 2px 4px rgba(255, 255, 255, 0.1),
      inset 2px 2px 8px rgba(0, 0, 0, 0.3);
    outline: none;
    cursor: pointer;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border: none;
    border-radius: 50%;
    box-shadow: -2px -2px 8px rgba(255, 255, 255, 1),
      -2px -2px 12px rgba(255, 255, 255, 0.5),
      inset 2px 2px 4px rgba(255, 255, 255, 0.1), 2px 2px 8px rgba(0, 0, 0, 0.3);
    background-color: #6b7280;
  }
  .shipping {
    margin-top: 1.2rem;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-primary-3);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
