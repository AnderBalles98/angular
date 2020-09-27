export class DestinoViaje {
  private selected: boolean;

  constructor(public nombre: string, public u: string) {

  }

  isSelected(): boolean {
    return this.selected;
  }

  setSelected(selected: boolean) {
    this.selected = selected;
  }
}
