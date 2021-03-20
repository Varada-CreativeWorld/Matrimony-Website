import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common'


@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  sprofileid:string;
  receiver_profileid:string;
  Form:FormGroup;

  constructor(private fb:FormBuilder,
    private crudService:CrudService,
    private router:Router,private location: Location) { 

      this.Form=this.fb.group({
        subject:['',Validators.required],
        message:['',Validators.required]
        
      });

    }

  ngOnInit(): void {
  }

  sendMessage(values){
    this.crudService.get_seesions().subscribe(result => {
      this.sprofileid=result.profileid;
      this.receiver_profileid=this.crudService.rprofileid;
    });
    const Data = new FormData();
      Data.append('sprofileid', this.sprofileid);
      Data.append('rprofileid', this.receiver_profileid);
      Data.append('subject', values.subject);
      Data.append('message', values.message);
     
      var object = {};
      Data.forEach(function(value, key){
      object[key] = value;
      });
      this.crudService.sendMail(object).subscribe(result => {
        if(result == "1"){
          alert('Mail Sent'); 
          this.Form.reset();         
        }
        else{
          alert('Failed to send message');
        }
      });
  }

  navigateBack(){
    //this.router.navigate(['searchresults']);
    this.location.back();
  }

}
