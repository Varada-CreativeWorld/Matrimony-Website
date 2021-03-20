import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeForm:FormGroup;
  DataArray:any=[];

  constructor(private fb:FormBuilder,
    private crudService:CrudService,
    private router:Router) { 
      this.homeForm=this.fb.group({
        sage:['',Validators.required],
        eage:['',Validators.required],
        sheight:['',Validators.required],
        eheight:['',Validators.required],
        gender:['',Validators.required],
        religion:['',Validators.required],
        language:['',Validators.required],
        country:['',Validators.required]
        
      });
    }

  ngOnInit() {
  }

  getResult(values){
    //console.log(values.name);
    const Data = new FormData();
    Data.append('sage', values.sage);
    Data.append('eage', values.eage);
    Data.append('sheight', values.sheight);
    Data.append('eheight', values.eheight);
    Data.append('gender', values.gender);
    Data.append('religion', values.religion);
    Data.append('country', values.country);
    Data.append('language', values.language);
    Data.append('privacy', 'Public');
    //console.log(Data);
    var object = {};
    Data.forEach(function(value, key){
    object[key] = value;
    });
    this.crudService.getSearchResult(object).subscribe(result => {
      /*this.DataArray=result;
      this.crudService.pass(this.DataArray);*/
      this.router.navigate(['searchs']);
    });
  }


}
