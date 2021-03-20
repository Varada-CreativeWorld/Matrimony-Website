import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advancesearch',
  templateUrl: './advancesearch.component.html',
  styleUrls: ['./advancesearch.component.css']
})
export class AdvancesearchComponent implements OnInit {

  advanceForm:FormGroup;
  DataArray:any=[];

  constructor(private fb:FormBuilder,
    private crudService:CrudService,
    private router:Router) {
      this.advanceForm=this.fb.group({
        sage:['',Validators.required],
        eage:['',Validators.required],
        sheight:['',Validators.required],
        eheight:['',Validators.required],
        language:['',Validators.required],
        gender:['',Validators.required],
        mstatus:['',Validators.required],
        country:['',Validators.required],
        religion:['',Validators.required],
        caste:['',Validators.required],
        education:['',Validators.required],
        occupation:['',Validators.required],
        ai:['',Validators.required],
        smoking:['',Validators.required],
        drinking:['',Validators.required],
        diet:['',Validators.required],
        bodytype:['',Validators.required],
        complexion:['',Validators.required],
        children:['',Validators.required],
        fvalues:['',Validators.required]
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
    Data.append('sheight', values.sheight);
    Data.append('eheight', values.eheight);
    Data.append('children', values.children);
    Data.append('smoking', values.smoking);
    Data.append('drinking', values.drinking);
    Data.append('diet', values.diet);
    Data.append('occupation', values.occupation);
    Data.append('income', values.ai);
    Data.append('fvalues', values.fvalues);
    Data.append('bodytype', values.bodytype);
    Data.append('complexion', values.complexion);
   
    //console.log(Data);
    var object = {};
    Data.forEach(function(value, key){
    object[key] = value;
    });
    this.crudService.getAdvanceSearchResult(object).subscribe(result => {
      //this.DataArray=result;
      //this.crudService.pass(this.DataArray);
      //console.log(this.crudService.get());
      this.router.navigate(['searchs']);
    });
  }

}
