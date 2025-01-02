export interface Fragancia {
  nombre: string;
  descripcion: string,
  fotoPrincipal: string;
  fotosAdicionales: string[];
  acordesPrincipales: string;
  calificacion: number;
  piramideOlfativa: string;
  genero: 'Unisex' | 'Femenino' | 'Masculino';
  disenador: string;
  anoDeLanzamiento: number;
  notas: {
    salida: string[];
    corazon: string[];
    fondo: string[];
  };
  familiaOlfativa: string;
  ocasiones: string[];
  precio: number;
  tamano: string;
  dupe: string;
  fotoDupe: string;
}
