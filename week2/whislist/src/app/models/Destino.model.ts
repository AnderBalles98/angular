export class Destino{
    nombre: string;
    imagenUrl: string;
    url: string;
    private isSelected: boolean;

    constructor(nombre: string, url:string, imagenUrl: string){
        this.nombre = nombre;
        this.imagenUrl = imagenUrl;
        this.url = url;
        this.isSelected = false;
    }

    getIsSelected() :boolean {
      return this.isSelected;
    }

    setIsSelected(isSelected: boolean): void {
      this.isSelected = isSelected;
    }

}
