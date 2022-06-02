import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      username:[''],
      email:[''],
      mobile:[''],
      salary:['']
    })
    this.getAllEmployee();
  }

  postEmployeeDetails(){
    this.employeeModelObj.username = this.formValue.value.username;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.employeeModelObj.username = this.formValue.value.username;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully");
      this.formValue.reset();
      this.func2();
      this.getAllEmployee();
    },
    err=>{
      alert("Something went wrong")
    })
  }



  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData=res;
    })
  }



  deleteEmployee(row :any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }


  onEdit(row:any){
    this.func1();
    this.employeeModelObj.id = row.id;
    this.formValue.controls['username'].setValue(row.username);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    const temp = document.getElementById("editButton");
    if(temp!=null){
      temp.style.display = 'block';
    }
  }

  updateEmployeeDetails(){
    this.employeeModelObj.username = this.formValue.value.username;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
    })
    this.func2();
    this.getAllEmployee();
  }



  // functions to close and display the add emp modal
  func1(){
    const temp = document.getElementById("exampleModal");
    if(temp!=null){
      temp.style.display = 'block';
    }
  }
  func2(){
    const temp = document.getElementById("exampleModal");
    if(temp!=null){
      temp.style.display = 'none';
    }
    this.formValue.reset();
    const temp2 = document.getElementById("editButton");
    if(temp2!=null){
      temp2.style.display = 'none';
    }
  }
}
