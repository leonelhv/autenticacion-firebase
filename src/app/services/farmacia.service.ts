import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Medicamento } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class FarmaciaService {
  constructor(private firestore: Firestore) {}

  addProduct(medicamento: Medicamento) {
    const farmaciaRef = collection(this.firestore, 'medicamentos');
    return addDoc(farmaciaRef, medicamento);
  }

  getProductos(): Observable<Medicamento[]> {
    const farmaciaRef = collection(this.firestore, 'medicamentos');
    return collectionData(farmaciaRef, { idField: 'id' }) as Observable<
      Medicamento[]
    >;
  }

  deleteProducto(medicamento: Medicamento) {
    const farmaciaRef = doc(this.firestore, `medicamentos/${medicamento.id}`);
    return deleteDoc(farmaciaRef);
  }
}
