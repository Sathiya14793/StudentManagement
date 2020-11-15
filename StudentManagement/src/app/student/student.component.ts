import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  public studentList: any[] = [];
  public columnDefs;
  public rowData: any;
  public gridApi;
  public gridColumnApi;
  searchtext: any;
  
  constructor(private dialog: MatDialog) {
    this.columnDefs = [
      { field: 'Id', sortable: true, width:60,resizable: true},
      { field: 'Name', sortable: true, resizable: true,  cellStyle: { color: 'blue', 'cursor': 'pointer' } },
      { field: 'Age', sortable: true, resizable: true },
      { field: 'Address', sortable: true,width:380, resizable: true },
      { field: 'Contact', sortable: true, resizable: true },
      {
        field: 'Delete', sortable: true, resizable: true, cellStyle: { color: 'Red', 'cursor': 'pointer' }
      }
    ];
  }

  ngOnInit() {

  }
  getStudentList() {
    this.studentList.push(
      {
        Id: 1, Name: "Sathiya Narayanan G", Age: 27, Address: "55 B/2 Sarong Street, Cuddalore OT", Contact: 9688153185, Delete: "Delete"
      },
      {
        Id: 2, Name: "Kannan B", Age: 34, Address: "27 Periyar Street, Erode", Contact: 7837838939, Delete: "Delete"
      },
      {
        Id: 3, Name: "Senthil Kumar S", Age: 26, Address: "113, TTK Road, Thiruvarur", Contact: 9873673876, Delete: "Delete"
      },
      {
        Id: 4, Name: "Sheik Abdullah R", Age: 34, Address: "B-1, Mosque Street, Ramnad", Contact: 7899875678, Delete: "Delete"
      },
      {
        Id: 5, Name: "Wazeed Shaik", Age: 29, Address: "09 SLV Colony, Palakad", Contact: 8897898734, Delete: "Delete"
      },
      {
        Id: 6, Name: "Nandhini C", Age: 29, Address: "114, ARR Road, Kumbakonam", Contact: 7876353639, Delete: "Delete"
      },
      {
        Id: 7, Name: "Goutham R", Age: 31, Address: "98, Naveen Salai, Chrompet", Contact: 9898078987, Delete: "Delete"
      },
      {
        Id: 8, Name: "Manoj Kumar BK", Age: 27, Address: "56, TVS Road, Royapettah", Contact: 8798767898, Delete: "Delete"
      },
      {
        Id: 9, Name: "Sushil Kumar G", Age: 35, Address: "14,AST Flats,Shozhinganalur ", Contact: 8909878979, Delete: "Delete"
      },
      {
        Id: 10, Name: "Sreevas P", Age: 37, Address: "27, AST Flats, Shozhinganalur", Contact: 7678987689, Delete: "Delete"
      },
    )
    this.rowData = this.studentList;
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.paginationSetPageSize(Number(5));
    this.gridColumnApi = params.columnApi;
    this.getStudentList();

  }
  onQuickFilterChanged() {
    this.gridApi.setQuickFilter(this.searchtext);
  }
  CellClicked(params) {
    if (params.colDef.field == "Delete") {
      this.DeleteStudent(params);
    }
    if(params.colDef.field == "Name"){
      this.AddStudent(params)
    }
  }
  AddStudent(params:any={}) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      Status: params.data == undefined ? "Add" : "Update",
      data: params.data == undefined ? "" : params.data
    };
    this.dialog.open(StudentDialogComponent, dialogConfig).afterClosed().subscribe((data) => {
      if (data) {
        if (data.Id == 0) {
          let result: any = {
            Id: this.studentList.length + 1,
            Name: data.Name,
            Age: data.Age,
            Address: data.Address,
            Contact: data.Contact
          }
          console.log(this.studentList);
          this.gridApi.applyTransaction({ add: [result] })
          alert("Student added Successfully!")
        }
        else {
          params.data.Id = data.Id;
          params.data.Name = data.Name;
          params.data.Age = data.Age;
          params.data.Address = data.Address;
          params.data.Contact = data.Contact;
          params.node.setData(params.data);
          alert("Student updated Successfully!")
        }
      }
    });
  }


  DeleteStudent(params) {
    this.gridApi.applyTransaction({ remove: [params.data] });
    alert("Student deleted Successfully!")
  }

}
