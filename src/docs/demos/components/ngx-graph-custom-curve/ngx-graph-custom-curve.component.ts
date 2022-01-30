import { Component } from '@angular/core';
import { Layout, Edge, Node } from '@swimlane/ngx-graph';
import { Subject } from 'rxjs';
import { DagreNodesOnlyLayout } from './customDagreNodesOnly';
import { stepRound } from './customStepCurved';

@Component({
  selector: 'ngx-graph-custom-curve',
  templateUrl: './ngx-graph-custom-curve.component.html'
})
export class NgxGraphCustomCurve {
  public curve: any = stepRound;
  public layout: Layout = new DagreNodesOnlyLayout();
  public links: Edge[] = [
    {
      id: 'a',
      source: 'first',
      target: 'second',
      label: 'is parent of'
    },
    {
      id: 'b',
      source: 'first',
      target: 'third',
      label: 'custom label'
    }
  ];
  public nodes: Node[] = [
    {
      id: 'first',
      label: 'A'
    },
    {
      id: 'second',
      label: 'B'
    },
    {
      id: 'third',
      label: 'C'
    },
    {
      id: 'fourth',
      label: 'D'
    }
  ];

  private transitionStart$: Subject<Node> = new Subject();
  private transitionEnd$: Subject<Node> = new Subject();
  private isTransitioning: boolean = false;

  onSelect(node: Node): void {
    if (!this.isTransitioning) {
      this.transitionStart$.next(node);
      this.isTransitioning = true;
    } else {
      this.transitionEnd$.next(node);
      this.isTransitioning = false;
    }
  }
}
