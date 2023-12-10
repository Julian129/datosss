import { Component, OnInit } from '@angular/core';
import { CrudService } from './service/crud.service';
//import { Personas } from './interfaces/personas.interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'datosss';

  students:any;
  studentName:string="";
  studentAge:number=0;
  studentAddress:string="";

  constructor(private crudService:CrudService){}
  ngOnInit(){
    this.crudService.read_Student().subscribe(data=>{
      this.students=data.map(e=>{
        return {
          id:e.payload.doc.id,
          Data: e.payload.doc.data()
        };
      })
    })
  }

  removeRecord(id:string){
    this.crudService.delete_Student(id);
  }

  createRecord(){
    let record ={
      Name:this.studentName,
      Age:this.studentAge,
      Adress:this.studentAddress
    };
    this.crudService.create_newStudent(record).then(resp=>{
      this.studentName="";
      this.studentAge=0;
      this.studentAddress="";
      console.log("resp");
    }).catch(error=>{
      console.log(error);
    });

  }
}