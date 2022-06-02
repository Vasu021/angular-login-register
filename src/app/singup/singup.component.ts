import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  public signupForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username:[''],
      email:[''],
      mobile:[''],
      password:['']
    })
  }

  signup(){
    this.httpClient.post("http://localhost:3000/signedupUsers", this.signupForm.value)
    .subscribe(res=>{
      alert("Signed up successfully");
      this.signupForm.reset();
      this.router.navigate(['login']);
    }, err=>{
      alert("Somethig went wrong");
    })
  }

}
