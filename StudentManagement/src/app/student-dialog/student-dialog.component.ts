import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDatepicker, MatSnackBar } from '@angular/material';

import { StudentComponent } from '../student/student.component';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {
  StudentDialogForm = this.fb.group({
    Name: [, Validators.required],
    Age: [, Validators.required],
    Address: [, Validators.required],
    Contact: [, Validators.required]
  });

  status: string = "";
  Id: number=0;
  Name: string = "";
  Age: string = "";
  Address: string = "";
  Contact: string = "";
  errormsg:string="";
  value:string="";
  constructor(@Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, 
  public snackBar: MatSnackBar,public dialogref: MatDialogRef<StudentDialogComponent>) { }

  ngOnInit() {
    this.status = this.data.Status;
    if (this.status == "Update") {
      this.Id = this.data.data.Id;
      this.Name = this.data.data.Name;
      this.Age = this.data.data.Age;
      this.Address = this.data.data.Address;
      this.Contact = this.data.data.Contact;
    }
  }
  SaveStudentData() {
    if (this.Name == "") {
      this.errormsg="Please enter Name !!";
      this.value="warning";
      return;
    }
    else if (this.Age == "") {
     this.errormsg="Please enter Age !!";
      this.value="warning";
      return;
    }
    else if (this.Address == "") {
      this.errormsg="Please enter Address !!";
      this.value="warning";
      return;
    }
    else if (this.Contact == "") {
      this.errormsg="Please enter Contact !!";
      this.value="warning";
      return;
    }
    var outputObj={
      Id:this.Id,
      Name:this.Name,
      Age:this.Age,
      Address:this.Address,
      Contact:this.Contact
    }
    this.dialogref.close(outputObj)
  }
  onlyintegers(event): any {
    var reg = /^[0-9\b ]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!reg.test(inputChar)) {
      event.preventDefault();
    }
  }
  removespcialcharactersandnumbers(event): any {
    var reg = /^[a-zA-Z&()\b ]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!reg.test(inputChar)) {
      event.preventDefault();
    }
  }
  Close(){
    this.dialogref.close();
  }
}
