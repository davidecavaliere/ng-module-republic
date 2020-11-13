import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as fromCells from './cells.reducer';
import * as CellsActions from './cells.actions';
import { Cell } from '@bba/api-interfaces';
import { CellsService } from '@bba/core-data';

@Injectable()
export class CellsEffects {
  loadCells$ = createEffect(() => this.actions$.pipe(
    ofType(CellsActions.loadCells),
    fetch({
      run: (action) =>
        this.cellsService
          .all()
          .pipe(
            map((cells: Cell[]) =>
              CellsActions.loadCellsSuccess({ cells })
            )
          ),
      onError: (action, error) => CellsActions.loadCellsFailure({ error }),
    })
  ));

  loadCell$ = createEffect(() => this.actions$.pipe(
    ofType(CellsActions.loadCell),
    fetch({
      run: (action) =>
        this.cellsService
          .find(action.cellId)
          .pipe(
            map((cell: Cell) =>
              CellsActions.loadCellSuccess({ cell })
            )
          ),
      onError: (action, error) => CellsActions.loadCellFailure({ error }),
    })
  ));

  createCell$ = createEffect(() => this.actions$.pipe(
    ofType(CellsActions.createCell),
    pessimisticUpdate({
      run: (action) =>
        this.cellsService
          .create(action.cell)
          .pipe(
            map((cell: Cell) =>
              CellsActions.createCellSuccess({ cell })
            )
          ),
      onError: (action, error) => CellsActions.createCellFailure({ error }),
    })
  ));

  updateCell$ = createEffect(() => this.actions$.pipe(
    ofType(CellsActions.updateCell),
    pessimisticUpdate({
      run: (action) =>
        this.cellsService
          .update(action.cell)
          .pipe(
            map((cell: Cell) =>
              CellsActions.updateCellSuccess({ cell })
            )
          ),
      onError: (action, error) => CellsActions.updateCellFailure({ error }),
    })
  ));

  deleteCell$ = createEffect(() => this.actions$.pipe(
    ofType(CellsActions.deleteCell),
    pessimisticUpdate({
      run: (action) =>
        this.cellsService
          .delete(action.cell)
          .pipe(
            map((cell: Cell) =>
              CellsActions.deleteCellSuccess({ cell })
            )
          ),
      onError: (action, error) => CellsActions.deleteCellFailure({ error }),
    })
  ));

  constructor(
    private actions$: Actions,
    private cellsService: CellsService
  ) {}
}