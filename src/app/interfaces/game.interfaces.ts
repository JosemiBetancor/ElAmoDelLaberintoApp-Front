export interface ICharacter {
    id?: number;
    nombre?: string;
    experiencia?: number;
    nivel?: number;
    claseArmadura?: number;
    vida?: number;
    clase?: string;
    alineamiento?: string;
    imagen?: string;
    inventario?: IInventario[];
}

export interface IInventario {
    id?: number;
    idPersonaje?: number;
    consumible?: string;
    nombre?: string;
    peso?: number;
    valor?: number;
}