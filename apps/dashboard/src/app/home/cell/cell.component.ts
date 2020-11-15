import { Component, ComponentFactoryResolver, Injector, Input, OnChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Cell } from '@bba/api-interfaces';
import { loadRemoteModule } from '@bba/core-data';
import { CellsFacade } from '@bba/core-state';

@Component({
  selector: 'bba-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnChanges {
  @ViewChild('placeHolder', { read: ViewContainerRef, static: true })
  viewContainer: ViewContainerRef;

  constructor(
    private injector: Injector,
    private cfr: ComponentFactoryResolver,
    private cellsFacade: CellsFacade
  ) { }

  @Input() cell: Cell;

  async ngOnChanges() {
    console.log(this.cell);
    this.viewContainer.clear();

    const test = {
      ...this.cell,
      healthy: false
    }

    const component = await loadRemoteModule(this.cell)
      .then(m => m[this.cell.componentName])
      .catch(err => {
        console.log(err);
        // console.log(test)
        // this.cellsFacade.updateCell(test)
      })

    const factory = this.cfr.resolveComponentFactory(component);

    this.viewContainer.createComponent(factory, null, this.injector);
  }
}