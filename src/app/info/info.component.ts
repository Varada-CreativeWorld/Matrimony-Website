import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  createForm:FormGroup;
  profileid:string;
  show=true;
  state:string[][]=[["Kerala","Gujarat","West Bengal","Jammu & Kashmir","Maharashtra","Madhya Pradesh","Uttarakhand","Punjab","Karnataka","Odisha"]
  ,["Punjab","Sir Valley"],["Los Angeles","Dumblin","New York"],["Hubei","Beijing","La-plos"]];
  Data:any[];

  constructor(private fb:FormBuilder,
    private crudService:CrudService,
    private router:Router,private route:ActivatedRoute) { 

      this.createForm=this.fb.group({
        name:['',Validators.required],
        education:['',Validators.required],
        edu_type:['',Validators.required],
        occupation:['',Validators.required],
        ai:['',Validators.required],
        fname:['',Validators.required],
        mname:['',Validators.required],
        fprof:['',Validators.required],
        mprof:['',Validators.required],
        nos:['',Validators.required],
        nob:['',Validators.required],
        fvalues:['',Validators.required],
        status:['',Validators.required],
        address:['',Validators.required],
        city:['',Validators.required],
        state:['',Validators.required],
        country:['',Validators.required],
        mobile:['',Validators.required],
        landline:['',Validators.required],
        email:['',Validators.required],
        age:['',Validators.required],
        gender:['',Validators.required],
        height:['',Validators.required],
        mstatus:['',Validators.required],
        religion:['',Validators.required],
        children:['',Validators.required],
        caste:['',Validators.required],
        about:['',Validators.required],
        weight:['',Validators.required],
        bd_grp:['',Validators.required],
        bodytype:['',Validators.required],
        scases:['',Validators.required],
        complexion:['',Validators.required],
        smoking:['',Validators.required],
        drinking:['',Validators.required],
        diet:['',Validators.required],
        page:['',Validators.required],
        pheight:['',Validators.required],
        pbodytype:['',Validators.required],
        pcomplexion:['',Validators.required],
        pscases:['',Validators.required],
        pfvalues:['',Validators.required],
        pmstatus:['',Validators.required],
        pdrinking:['',Validators.required],
        psmoking:['',Validators.required],
        pdiet:['',Validators.required],
        peducation:['',Validators.required],
        profession:['',Validators.required]
        
      });

    }

    skip(){
      this.show=!this.show;
    }

    onSelect(value){
      if(value == 'India'){
        this.Data=this.state[0];
      }
      else if(value == 'Pakistan'){
        this.Data=this.state[1];
      }
      else if(value == 'USA'){
        this.Data=this.state[2];
      }
      else if(value == 'China'){
        this.Data=this.state[3];
      }
      
      
    }

    save(values){
      //console.log(values.name);
      this.profileid=this.route.snapshot.paramMap.get('profileid');
      const Data = new FormData();
      Data.append('profileid',this.profileid);
      Data.append('name', values.name);
      Data.append('education', values.education);
      Data.append('edu_type', values.edu_type);
      Data.append('occupation', values.occupation);
      Data.append('income', values.ai);
      Data.append('fname', values.fname);
      Data.append('mname', values.mname);
      Data.append('fprofession', values.fprof);
      Data.append('mprofession', values.mprof);
      Data.append('nos', values.nos);
      Data.append('nob', values.nob);
      Data.append('fvalues', values.fvalues);
      Data.append('status', values.status);
      Data.append('address', values.address);
      Data.append('city', values.city);
      Data.append('state', values.state);
      Data.append('country', values.country);
      Data.append('mobile', values.mobile);
      Data.append('landline', values.landline);
      
      Data.append('email', values.email);
      Data.append('age', values.age);
      Data.append('gender', values.gender);
      Data.append('height', values.height);
      Data.append('mstatus', values.mstatus);
      Data.append('religion', values.religion);
      Data.append('children', values.children);
      Data.append('caste', values.caste);
      Data.append('about', values.about);
      Data.append('weight', values.weight);
      Data.append('bodytype', values.bodytype);
      Data.append('complexion', values.complexion);
      Data.append('scases', values.scases);
      Data.append('bd_grp', values.bd_grp);
      Data.append('smoking', values.smoking);
      Data.append('drinking', values.drinking);
      Data.append('diet', values.diet);
      //Data.append('name', values.name);
      Data.append('page', values.page);
      Data.append('pheight', values.pheight);
      Data.append('pbodytype', values.pbodytype);
      Data.append('pcomplexion', values.pcomplexion);
      Data.append('pscases', values.pscases);
      Data.append('pfvalues', values.pfvalues);
      Data.append('pmstatus', values.pmstatus);
      Data.append('psmoking', values.psmoking);
      Data.append('pdrinking', values.pdrinking);
      Data.append('pdiet', values.pdiet);
      Data.append('peducation', values.peducation);
      Data.append('profession', values.profession);
      //console.log(Data);
      var object = {};
      Data.forEach(function(value, key){
      object[key] = value;
      });
      this.crudService.create(object).subscribe(result => {
        this.createForm.reset();
        this.router.navigate(['home']);
      });
      this.router.navigate(['home']);
    }

    loadData(){
      this.profileid=this.route.snapshot.paramMap.get('profileid');
        var object = {};
        object['profileid'] = this.profileid;
        this.crudService.getBasicInfo(object).subscribe(result => {
          this.createForm.controls['email'].setValue(result.email);
          this.createForm.controls['name'].setValue(result.name);
          this.createForm.controls['age'].setValue(result.age);
          this.createForm.controls['gender'].setValue(result.gender);
        })
    }

  ngOnInit() {
    this.loadData();
  }

}
