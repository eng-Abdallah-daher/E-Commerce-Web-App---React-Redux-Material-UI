import { createSlice } from '@reduxjs/toolkit';
import { obj } from '../../data/products';
const initialState = {
  products: obj.results,
  filteredProducts: obj.results,
  searchQuery: '',
  filters: {
    type: [],
    size: [],
    color: [],
    priceRange: [0, 1000]
  },
  loading: false,
  error: null
};
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredProducts = state.products.filter(product =>
        product.productName && product.productName.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    clearSearch: (state) => {
      state.searchQuery = '';
      state.filteredProducts = state.products;
    },
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value;
      state.filteredProducts = state.products.filter(product => {
        let matchesType = true;
        let matchesSize = true;
        let matchesColor = true;
        let matchesPrice = true;
        if (state.filters.type.length > 0) {
          matchesType = state.filters.type.includes(product.type);
        }
        if (state.filters.size.length > 0) {
          matchesSize = state.filters.size.some(size => product.sizes.includes(size));
        }
        if (state.filters.color.length > 0) {
          matchesColor = state.filters.color.includes(product.color);
        }
        const [min, max] = state.filters.priceRange;
        matchesPrice = product.price >= min && product.price <= max;
        return matchesType && matchesSize && matchesColor && matchesPrice;
      });
      if (state.searchQuery) {
        state.filteredProducts = state.filteredProducts.filter(product =>
          product.productName && product.productName.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }
    },
    clearFilters: (state) => {
      state.filters = {
        type: [],
        size: [],
        color: [],
        priceRange: [0, 1000]
      };
      state.filteredProducts = state.products;
      if (state.searchQuery) {
        state.filteredProducts = state.filteredProducts.filter(product =>
          product.productName && product.productName.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }
    }
  },
});
export const {
  setSearchQuery,
  clearSearch,
  setFilter,
  clearFilters
} = productsSlice.actions;
export const selectAllProducts = (state) => state.products.products;
export const selectFilteredProducts = (state) => state.products.filteredProducts;
export const selectSearchQuery = (state) => state.products.searchQuery;
export const selectFilters = (state) => state.products.filters;
export default productsSlice.reducer;
