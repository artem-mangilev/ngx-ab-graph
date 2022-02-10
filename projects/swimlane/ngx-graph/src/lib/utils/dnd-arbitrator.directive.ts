import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({ selector: '[dndArbitratorClick], [dndArbitratorDrop]' })
export class DndArbitratorDirective {
  @Output('dndArbitratorClick')
  public click = new EventEmitter<MouseEvent>();

  @Output('dndArbitratorDrop')
  public drop = new EventEmitter<MouseEvent>();

  private readonly _delta: number = 6;

  private _startX!: number;
  private _startY!: number;

  /**
   * mousedown
   * @param event
   */
  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: MouseEvent): void {
    this._startX = event.pageX;
    this._startY = event.pageY;
  }

  /**
   * mouseup
   * @param event
   */
  @HostListener('mouseup', ['$event'])
  public onMouseUp(event: MouseEvent): void {
    const diffX: number = Math.abs(event.pageX - this._startX);
    const diffY: number = Math.abs(event.pageY - this._startY);

    if (diffX < this._delta && diffY < this._delta) {
      this.click.emit(event);
    } else {
      this.drop.emit(event);
    }
  }
}
