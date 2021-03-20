import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Router } from '@angular/router';
import {ViewChild, ElementRef} from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  profileid:number;
  rprofileid:number;
  sname:string;
  simage:string;
  name:string;
  image:string;
  Form:FormGroup;
  Data:any;
  Chat:any;
  state=true;

  constructor(private fb:FormBuilder,
    private crudService:CrudService,
    private router:Router,private location: Location) { 

      this.Form=this.fb.group({
        message:['',Validators.required]
      });

    }

  ngOnInit(): void {
    this.crudService.get_seesions().subscribe(result => {
      this.profileid=result.profileid;
      this.name=result.name;
      var object = {};
        object['profileid'] =this.profileid;
    this.crudService.get_followers(object).subscribe(result => {
      this.Data=result;
      console.log(result);
    });
      
    });
    
  }

  get_chats(val1,val2,val3){
    var object = {};
        object['sprofileid'] =this.profileid;
        object['rprofileid'] =val1;
        this.rprofileid=val1;
        this.simage=val2;
        this.sname=val3;
    this.crudService.get_chats(object).subscribe(result => {
      this.Chat=result;
      console.log(this.Chat);
    });
    object['profileid'] =this.profileid;
    this.crudService.get_image(object).subscribe(result => {
      this.image=result.image;
      
    });
  }

  check(val){
    if(val){
      this.state=true;
    }
    else{
      this.state=false;
    }
    
  }

  send(val){
    var object = {};
        object['sprofileid'] =this.profileid;
        object['rprofileid'] =this.rprofileid;
        object['message'] =val.message;
        this.crudService.send_chats(object).subscribe(result => {
          if(result.message == "1"){
            this.get_chats(this.rprofileid,this.simage,this.sname);
            this.Form.reset();
          }
        });
  }

  navigateBack(){
    //this.router.navigate(['searchresults']);
    this.location.back();
  }

  


}
