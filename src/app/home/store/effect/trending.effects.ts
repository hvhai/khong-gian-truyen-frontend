import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ProductServiceApi } from 'src/app/core/service/product.service.api';
import { TrendingApiActions, TrendingPageActions } from '../action';

@Injectable()
export class TrendingEffects {
  loadTrendings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendingPageActions.loadTrendingPages),
      concatMap(() =>
        this.productServiceApi.getLimitTrendingProduct(5).pipe(
          map((products) => TrendingApiActions.loadTrendingsSuccess({ products })),
          catchError((error) =>
            of(TrendingApiActions.loadTrendingsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private productServiceApi: ProductServiceApi
  ) {}
}