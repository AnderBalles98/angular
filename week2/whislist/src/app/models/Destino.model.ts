export class Destino{
    private nombre: string;
    private imagenUrl: string;
    private url: string;
    public isSelected: boolean;
    private services: string[];
    private id: string;

    constructor(nombre: string, url:string, imagenUrl: string){
        this.nombre = nombre;
        this.imagenUrl = imagenUrl;
        this.url = url;
        this.isSelected = false;
        this.services = ['Arma tu PC', '¿Qué es la CPU?'];
        
    }

    getId(): string {
      return this.id;
    }

    setId(id: string): void {
      this.id = id;
    }

    getServices(): string[] {
      return this.services;
    }

    addService(service: string): void {
      this.services.push(service);
    }

    removeService(service: string): void {
      const index = this.services.indexOf(service);
      this.services.splice(index, 1);
    }

    getNombre(): string {
      return this.nombre;
    }

    setNombre(nombre: string): void {
      this.nombre = nombre;
    }

    getImagenUrl(): string {
      return this.imagenUrl;
    }

    setImagenUrl(imagenUrl: string): void {
      this.imagenUrl = imagenUrl;
    }

    getUrl(): string {
      return this.url;
    }

    setUrl(url: string) {
      this.url = url;
    }

    getIsSelected() :boolean {
      return this.isSelected;
    }

    setIsSelected(isSelected: boolean): void {
      this.isSelected = isSelected;
    }

}
