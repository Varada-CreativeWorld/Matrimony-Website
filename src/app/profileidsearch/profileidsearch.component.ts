import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profileidsearch',
  templateUrl: './profileidsearch.component.html',
  styleUrls: ['./profileidsearch.component.css']
})
export class ProfileidsearchComponent implements OnInit {

  Form:FormGroup;

  constructor(private fb:FormBuilder,
    private crudService:CrudService,
    private router:Router,private route:ActivatedRoute) {
      this.Form=this.fb.group({
        profileid:['',Validators.required]
        
      });
     }

  ngOnInit() {
  }

  view(value){
    this.router.navigate(['profile',value.profileid]);
  }

}
