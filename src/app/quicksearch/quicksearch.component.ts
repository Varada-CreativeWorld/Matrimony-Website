import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-quicksearch',
  templateUrl: './quicksearch.component.html',
  styleUrls: ['./quicksearch.component.css']
})
export class QuicksearchComponent implements OnInit {

  quickForm:FormGroup;
  DataArray:any=[];

  constructor(private fb:FormBuilder,
    private crudService:CrudService,
    private router:Router) { 
      this.quickForm=this.fb.group({
        sage:['',Validators.required],
        eage:['',Validators.required],
        language:['',Validators.required],
        gender:['',Validators.required],
        mstatus:['',Validators.required],
        country:['',Validators.required],
        religion:['',Validators.required],
        caste:['',Validators.required],
        education:['',Validators.required]
      });
    }

  ngOnInit() {
  }

  getResult(values){
    //console.log(values.name);
    const Data = new FormData();
    Data.append('sage', values.sage);
    Data.append('eage', values.eage);
    Data.append('mstatus', values.mstatus);
    Data.append('religion', values.religion);
    Data.append('gender', values.gender);
    Data.append('caste', values.caste);
    Data.append('education', values.education);
    Data.append('language', values.language);
    Data.append('country', values.country);
    Data.append('privacy', values.privacy);
    //console.log(Data);
    var object = {};
    Data.forEach(function(value, key){
    object[key] = value;
    });
    this.crudService.getQuickSearchResult(object).subscribe(result => {
      //this.DataArray=result;
      //this.crudService.pass(this.DataArray);
      //console.log(this.crudService.get());
      this.router.navigate(['searchs']);
    });
  }


}
