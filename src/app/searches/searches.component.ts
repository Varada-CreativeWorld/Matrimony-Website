import { Component, OnInit , OnDestroy, ViewChild, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {MatPaginatorModule,MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styleUrls: ['./searches.component.css']
})
export class SearchesComponent implements OnInit {

  sprofileid:string;
  DataArray:any=[];
  gender:string;
  show=false;
  Form:FormGroup;
  sender_profileid:string;
  receiver_profileid:string;
  check_val_req=false;
  check_val_wait=false;
  following=false;
  state:string[][]=[["Kerala","Gujarat","West Bengal","Jammu & Kashmir","Maharashtra","Madhya Pradesh","Uttarakhand","Punjab","Karnataka","Odisha"]
  ,["Punjab","Sir Valley"],["Los Angeles","Dumblin","New York"],["Hubei","Beijing","La-plos"]];
  Data:any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.DataArray);
  obs: Observable<any>;


  constructor(private fb:FormBuilder,
    private crudService:CrudService,
    private router:Router,private changeDetectorRef: ChangeDetectorRef) {

      this.Form=this.fb.group({
        subject:['',Validators.required],
        message:['',Validators.required]
        
      });

     }
  

  ngOnInit() {
    this.crudService.get_search_seesions().subscribe(result => {
      this.DataArray=result;
      
    });

    this.crudService.get_seesions().subscribe(result => {
      this.gender=result.gender;
      
    });
    
    //this.loaddata();   
    
  }

  onSelect(value){
    if(value == "India"){
      this.Data=this.state[0];
    }
    else if(value == "Pakistan"){
      this.Data=this.state[1];
    }
    else if(value == "China"){
      this.Data=this.state[3];
    }
    
  }  

  /*loaddata(){
      this.crudService.get_seesions().subscribe(result => {
      this.gender=result.gender;
      var object = {};
        object['gender'] = this.gender;
        this.crudService.getSearch(object).subscribe(result => {
        this.DataArray=result;
        });
    });    

    this.dataSource=this.DataArray;   
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    
  }*/

  view(value){
    this.router.navigate(['profile',value]);
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
        if(result.message == "1"){
          alert("Your Request has already been accepted by the candidate");
        }else if(result.message == "2"){
          alert("Your have already requested the candidate");
        }
        else if(result.message == "3"){
          alert("Request Sent");
        }
        else{
          alert("Action failed");
        }
      });
    });
    
  }

  initializeReceiver(value){
    this.receiver_profileid=value;
    this.crudService.get_seesions().subscribe(result => {
    this.sprofileid=result.profileid;
    var object = {};
    object["sprofileid"] = this.sprofileid;
    object["rprofileid"] = value;
    this.crudService.get_status(object).subscribe(result => {
      if(result == "1"){
        this.crudService.rprofileid=value;
        this.router.navigate(['mail']);
      }
      else{
        alert('You and the requested candidate do not follow each other');
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

  filter(){
    
    const Data = new FormData();
      Data.append('afrom', (<HTMLInputElement>document.getElementById("afrom")).value);
      Data.append('ato', (<HTMLInputElement>document.getElementById("ato")).value);
      Data.append('hfrom', (<HTMLInputElement>document.getElementById("hfrom")).value);
      Data.append('hto', (<HTMLInputElement>document.getElementById("hto")).value);
      Data.append('country', (<HTMLInputElement>document.getElementById("country")).value);
      Data.append('state', (<HTMLInputElement>document.getElementById("state")).value);
      Data.append('mstatus', (<HTMLInputElement>document.getElementById("mstatus")).value);
      Data.append('gender', this.gender);
      
      var object = {};
      Data.forEach(function(value, key){
      object[key] = value;
      });
      console.log((<HTMLInputElement>document.getElementById("country")).value);
    this.crudService.refine_search(object).subscribe(result => {
      this.DataArray=result;
    });
    
  }

}
