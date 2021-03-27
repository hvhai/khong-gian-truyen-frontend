import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductPaging } from 'src/app/core/model/product-paging.model';
import { Product } from 'src/app/core/model/product.model';
import { TrendingProductReducer } from '../reducer';

export const selectTrendingProductsState = createFeatureSelector<TrendingProductReducer.State>(
  TrendingProductReducer.trendingFeatureKey
);

export const selectAllTrendingProducts = createSelector(
  selectTrendingProductsState,
  TrendingProductReducer.selectAll
);

export const selectPagingInfo = createSelector(
  selectTrendingProductsState,
  (state: TrendingProductReducer.State) => {
    let hasPrevious = state.start > state.size ? true : false;
    let hasNext = state.start + state.size < state.total ? true : false;
    return {
      size: state.size,
      start: state.start,
      total: state.total,
      order: state.order,
      page: state.page,
      hasPrevious: hasPrevious,
      hasNext: hasNext,
    };
  }
);
export const selectProductWithPaging = createSelector(
  selectAllTrendingProducts,
  selectPagingInfo,
  (allProducts, paging): ProductPaging => {
    const result: ProductPaging = {
      currentList: allProducts,
      size: paging.start,
      total: paging.total,
      start: paging.start,
    };
    return result;
  }
);

/********************************************************************************* */
/****RETURN PRODUCTS VIEW MODEL */
/********************************************************************************* */
export interface TrendingProductViewModel {
  products: Product[];
}

export const selectTrendingProductsViewModel = createSelector(
  selectAllTrendingProducts,
  (products: Product[]): TrendingProductViewModel => {
    return {
      products: products,
    };
  }
);
