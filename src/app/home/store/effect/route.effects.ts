import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { TrendingPageActions } from '../action';

@Injectable()
export class RouteEffects {
  showProductDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TrendingPageActions.showTrendingDetails),
        tap(({ id }) => {
          console.log('show product details for id : ', id);
          this.router.navigate(['/' + id]);
        })
      ),
    { dispatch: false }
  );
  constructor(private actions$: Actions, private router: Router) {}
}