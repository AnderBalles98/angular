export class Destino{
    nombre: string;
    imagenUrl: string;
    url: string;

    constructor(nombre: string, url:string, imagenUrl: string){
        this.nombre = nombre;
        this.imagenUrl = imagenUrl;
        this.url = url;
    }
}