export interface Medicamento {
  id?: string;
  nombre: string;
  costo: Number;
  imagen: string;
}

export interface userInfo {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}
