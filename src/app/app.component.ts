import { Component, OnInit } from '@angular/core';
import { CrudService } from './service/crud.service';
import { Personas } from './interfaces/personas.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'datosss';
  selectedStudentId: string | null = null;
  students: any;
  studentName = "";
  studentAge: number = 0;
  studentAddress = "";

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.crudService.read_Student().subscribe(data => {
      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          Data: e.payload.doc.data()
        };
      })
    });
  }

  removeRecord(id: string) {
    this.crudService.delete_Student(id);
  }

  clearForm() {
    this.studentName = '';
    this.studentAge = 0;
    this.studentAddress = '';
    this.selectedStudentId = null;
  }
  createRecord() {
    if (this.selectedStudentId) {
      let record = {
        Name: this.studentName,
        Age: this.studentAge,
        Adress: this.studentAddress,
      };
      this.crudService.update_Student(this.selectedStudentId, record)
        .then(() => {
          this.clearForm();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let record = {
        Name: this.studentName,
        Age: this.studentAge,
        Adress: this.studentAddress,
      };
      this.crudService.create_newStudent(record).then((resp: any) => {
        this.clearForm();
      }).catch((error: any) => {
        console.log(error);
      });
    }
  }

  loadStudentData(id: string) {
    this.crudService.get_StudentById(id).subscribe((data: any) => {
      this.studentName = data.Name;
      this.studentAge = data.Age;
      this.studentAddress = data.Adress;
      this.selectedStudentId = id;
    });
  }

  refreshForm(){
    this.clearForm();
  }
}