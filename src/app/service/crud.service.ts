import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
//import { HttpClient } from '@angular/common/http';
//import { Personas } from '../interfaces/personas.interface';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore:AngularFirestore) { }

  create_newStudent(record:{}){
    return this.firestore.collection('Student').add(record);
  }
  read_Student(){
    return this.firestore.collection('Student').snapshotChanges();
  }

  delete_Student(id:string){
    return this.firestore.doc('Student/'+id).delete();
  }

}
