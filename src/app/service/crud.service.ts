import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
//import { HttpClient } from '@angular/common/http';
//import { Personas } from '../interfaces/personas.interface';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore: AngularFirestore) { }

  create_newStudent(record: {}) {
    return this.firestore.collection('Student').add(record);
  }
  read_Student() {
    return this.firestore.collection('Student').snapshotChanges();
  }

  delete_Student(id: string) {
    return this.firestore.doc('Student/' + id).delete();
  }

  // Agrega un nuevo método para obtener un estudiante específico
  get_StudentById(id: string) {
    return this.firestore.doc('Student/' + id).valueChanges();
  }

  // Agrega un método para actualizar un estudiante existente
  update_Student(id: string, record: any) {
    return this.firestore.doc('Student/' + id).update(record);
  }
}


