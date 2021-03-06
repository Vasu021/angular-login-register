import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { ShareIdService } from "../shared/share-id.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  constructor(
    private formBuilder: FormBuilder, 
    private httpClient: HttpClient, 
    private router: Router,
    private shareId: ShareIdService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }


  login(){
    // alert("here");
    this.httpClient.get<any>("http://localhost:3000/signedupUsers")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });

      if(user){
        alert("Login Success");
        this.loginForm.reset();
        this.shareId.setId(user.id);
        this.router.navigate(['dashboard']);
      }
      else{
        alert("User not found");
      }

    }, err=>{
      alert("Something went wrong");
    })
  }

}
