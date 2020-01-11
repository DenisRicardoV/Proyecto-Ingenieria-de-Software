export interface Viajero{
    nombre: string,
    apellidos: string,
    pais: string,
    email:string,
    password:string,
    accept:boolean
};

export interface Representante{
    dni: Int32Array,
    nombre: string,
    apellidos: string,
    email:string,
    password:string,
};

export interface Empresa{
    nombre: string,
    razonSocial: string,
    ruc:string,
    email:string,
    telefono:Int32Array,
    web: string,
    direccion: string,
    region: string,
    logo: File,
    accept:boolean
};
export class Login{
    email: string;
    password: string;
}


