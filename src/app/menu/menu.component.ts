import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Router } from '@angular/router';
import {ViewChild, ElementRef} from '@angular/core';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  profileid:number;
  registerForm:FormGroup;
  loginForm:FormGroup;
  Data:any=[];
  Id:any=[];
  DataArray :any=[];
  loggedIn=false;
  password:string;
  state:string[][]=[["Kerala","Gujarat","West Bengal","Jammu & Kashmir","Maharashtra","Madhya Pradesh","Uttarakhand","Punjab","Karnataka","Odisha"]
  ,["Punjab","Sir Valley"],["Los Angeles","Dumblin","New York"],["Hubei","Beijing","La-plos"]];
  @ViewChild('closeBtn', {static: false}) closeBtn: ElementRef;
  @ViewChild('closeBtnr', {static: false}) closeBtnr: ElementRef;
 
  constructor(private fb:FormBuilder,
    private crudService:CrudService,
    private router:Router) {

      this.registerForm=this.fb.group({
        name:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        language:['',Validators.required],
        //address:['',Validators.required],
        gender:['',Validators.required],
        dob:['',Validators.required],
        password:['',[Validators.required,Validators.minLength(8)]],
        cpassword:['',Validators.required]
      });

      this.loginForm=this.fb.group({
        email:['',Validators.required],
        password:['',Validators.required],
      });
     }

     MustMatch(values){
      if(values.password == values.cpassword)   {
        return false;
      }
      else{
        return true;
      }
          
    }

     saveR(values){
      //console.log(values.name);
      const RegisterData = new FormData();
      RegisterData.append('name', values.name);
      RegisterData.append('email', values.email);
      RegisterData.append('language', values.language);
      //RegisterData.append('address', values.address);
      RegisterData.append('gender', values.gender);
      RegisterData.append('password', values.password);
      RegisterData.append('dob', values.dob);
      //console.log(RegisterData);
      var object = {};
      RegisterData.forEach(function(value, key){
      object[key] = value;
      });
      this.crudService.register(object).subscribe(result => {
        //console.log(result);
        if(result.message == "1"){
          this.Id=result;
          this.loggedIn=true;
          alert("Registration Successful");        
          this.router.navigate(['info',this.Id.profileid]);
          this.closeBtn.nativeElement.click();
          this.closeBtnr.nativeElement.click();
          this.loginForm.reset();
          this.registerForm.reset();
        }
        else{
          alert("Entered EmailId already Exists");
        }
        
      });
    }

    saveL(values){
     
      var object = {};
        object['email'] = values.email;
        object['password'] = values.password;
        this.crudService.login(object).subscribe(result => {
          if(result.login == "true"){
            this.loggedIn=result.login;
            this.profileid=result.profileid;
            alert("Login Successful");
            this.closeBtn.nativeElement.click();
            this.loginForm.reset();
            this.router.navigate(['searchresults']);
          }
          else{
            alert("Login Failed");
          }
        });
      
      }

    logout(){
      this.loggedIn=false;
      this.loggedIn=false;
      this.crudService.logout().subscribe(result => {
        if(result.message == "1"){
          this.profileid=null;
          this.router.navigate(['home']);
        }
      });
      
    }

  ngOnInit() {
    this.crudService.get_seesions().subscribe(result => {
      this.loggedIn=result.login;
      this.profileid=result.profileid;
    });
  }

  onSelect(value){
    this.Data=this.state[value];
  }

  

}
