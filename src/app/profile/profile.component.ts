import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileid:string;
  sprofileid:string;
  receiver_profileid:string;
  Data:any[];
  show=true;
  check_val_req=false;
  check_val_wait=false;
  following=false;

  constructor(private fb:FormBuilder,
    private crudService:CrudService,
    private router:Router,private route:ActivatedRoute,private location: Location) { }

  ngOnInit() {

    this.loadData();
    
  }

  loadData(){
    this.profileid=this.route.snapshot.paramMap.get('profileid');
    this.crudService.get_seesions().subscribe(result => {
      this.sprofileid=result.profileid;
      var object = {};
        object['profileid'] = this.profileid;
        object['sprofileid'] = this.sprofileid;
        this.crudService.getProfile(object).subscribe(result => {
          //console.log(result);
          this.Data=result;
        });
    });
    
  }

  navigateBack(){
    //this.router.navigate(['searchresults']);
    this.location.back();
  }

  flip(){
    this.show=!this.show;
  }

  shortlist(value){
    this.crudService.get_seesions().subscribe(result => {
      this.sprofileid=result.profileid;
      var object = {};
        object['sprofileid'] = this.sprofileid;
        object['rprofileid'] = value;
      this.crudService.shortlist(object).subscribe(result => {
        if(result.message == "1"){
          alert("Candidate Shorlisted");
        }
        else{
          alert("Candidate Already Shorlisted");
        }
      });
    });
    
  }

  sendRequest(value){
    this.crudService.get_seesions().subscribe(result => {
      this.sprofileid=result.profileid;
      var object = {};
        object['sprofileid'] = this.sprofileid;
        object['rprofileid'] = value;
      this.crudService.sendRequest(object).subscribe(result => {
        if(result.message == "3"){
          alert("Request Sent");
        }
        else if(result.message == "2"){
          alert("Request Already Sent");
        }
        else{
          alert("Action Failed");
        }
      });
    });
    
  }

  check(val){
    if(val == 'Rejected' || val == null || val==""){
      this.check_val_req= true;
      this.following=false;
      this.check_val_wait=false;
    }
    else if(val == 'Accepted'){
      this.following=true;
      this.check_val_wait=false;
      this.check_val_req=false;
    }
    else{
      this.check_val_wait= true;
      this.following=false;
      this.check_val_req=false;
    }
  }

  initializeReceiver(value){
    this.receiver_profileid=value;
    this.crudService.rprofileid=value;
    this.crudService.get_seesions().subscribe(result => {
    this.sprofileid=result.profileid;
    var object = {};
    object["sprofileid"] = this.sprofileid;
    object["rprofileid"] = value;
    this.crudService.get_status(object).subscribe(result => {
      if(result == "1"){
        this.router.navigate(['mail']);
      }
      else{
        alert('You and the requested candidate do not follow each other');
      }
    });
    });
    
    

  }

  print(){
    window.print();
  }

  
  

}
