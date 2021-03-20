import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  showpd=true;
  showup=false;
  showeis=false;
  showeir=false;
  showeiss=true;
  showsl=false;
  showm=false;
  showoc=false;
  showum=false;
  showmi=false;
  showss=false;
  showcp=false;
  showca=false;
  showupdate=false;
  loggedIn=false;
  inbox=false;
  sent=false;
  display=false;

  profileid:string;
  rprofileid:string;
  image:string;
  contactForm:FormGroup;
  preferenceForm:FormGroup;
  familyForm:FormGroup;
  educationForm:FormGroup;
  personalForm:FormGroup;
  imageForm:FormGroup;
  passwordForm:FormGroup;
  Form:FormGroup;
  Mail:any[];
  ImageData:any[];
  DataArray:any[];
  DataArray1:any[];
  DataArray2:any[];
  DataArray3:any[];
  DataArray4:any[];

  constructor(private fb:FormBuilder,
    private crudService:CrudService,
    private router:Router,private route:ActivatedRoute,private location: Location) { 

      this.imageForm=this.fb.group({
        
        image:['',Validators.required],
        privacy:['',Validators.required]
        
        
      });

      this.Form=this.fb.group({
        
        subject:['',Validators.required],
        message:['',Validators.required]
        
        
      });

      this.contactForm=this.fb.group({
        
        address:['',Validators.required],
        city:['',Validators.required],
        state:['',Validators.required],
        country:['',Validators.required],
        mobile:['',Validators.required],
        landline:['',Validators.required],
        email:['',Validators.required]
        
      });
      //this.contactForm.disable();

      this.preferenceForm=this.fb.group({
        
        page:['',Validators.required],
        pbodytype:['',Validators.required],
        pmstatus:['',Validators.required],
        pfvalues:['',Validators.required],
        pdrinking:['',Validators.required],
        peducation:['',Validators.required],
        pheight:['',Validators.required],
        pcomplexion:['',Validators.required],
        psmoking:['',Validators.required],
        pdiet:['',Validators.required],
        profession:['',Validators.required],
        pscases:['',Validators.required]
        
      });

      this.familyForm=this.fb.group({
        
        fname:['',Validators.required],
        fprof:['',Validators.required],
        mname:['',Validators.required],
        mprof:['',Validators.required],
        nos:['',Validators.required],
        nob:['',Validators.required],
        fvalues:['',Validators.required],
        status:['',Validators.required]
        
      });

      this.educationForm=this.fb.group({
        
        education:['',Validators.required],
        ai:['',Validators.required],
        occupation:['',Validators.required],
        edu_type:['',Validators.required]
        
      });

      this.personalForm=this.fb.group({
        
        age:['',Validators.required],
        bodytype:['',Validators.required],
        mstatus:['',Validators.required],
        weight:['',Validators.required],
        drinking:['',Validators.required],
        children:['',Validators.required],
        height:['',Validators.required],
        complexion:['',Validators.required],
        smoking:['',Validators.required],
        diet:['',Validators.required],
        name:['',Validators.required],
        scases:['',Validators.required],
        gender:['',Validators.required],
        religion:['',Validators.required],
        caste:['',Validators.required],
        about:['',Validators.required],
        bd_grp:['',Validators.required]
        
      });

      this.passwordForm=this.fb.group({
        
        password:['',Validators.required],
        npassword:['',[Validators.required,Validators.minLength(8)]],
        cpassword:['',Validators.required]
        
        
      });

    }

  ngOnInit() {

    this.crudService.get_seesions().subscribe(result => {
      this.loggedIn=result.login;
      if(this.loggedIn){

        this.personalForm.disable();
        this.preferenceForm.disable();
        this.educationForm.disable();
        this.familyForm.disable();
        this.contactForm.disable();
        this.loadData(); 
        this.loadImage();
        this.loadProfileImage();
        //this.loadInbox(); 
        this.getInterestSent(); 
        this.getshortlist(); 
        this.getMatches();
        
      }
      
    });   
    
   
  }

  getshortlist(){
    var object = {};
    object["profileid"] = this.profileid;    
    this.crudService.get_shortlist(object).subscribe(result => {
      this.DataArray2=result;
      
    });
    
  }

  remove(val){
    var object = {};
    object["sprofileid"] = this.profileid;  
    object["rprofileid"] = val;  
    this.crudService.remove_shortlist(object).subscribe(result => {
      if(result.message == "1"){
        alert("Candidate Removed");
      }
      this.getshortlist();
    });
    
  }

  getInterestSent(){
    this.showeiss=true;
    this.showeir=false;
    var object = {};
    object["profileid"] = this.profileid;    
    this.crudService.getInterestSent(object).subscribe(result => {
      this.DataArray=result;
      
    });
    
  }

  getInterestReceived(){
    this.showeir=true;
    this.showeiss=false;
    var object = {};
    object["profileid"] = this.profileid;    
    this.crudService.getInterestReceived(object).subscribe(result => {
      console.log(result);
      this.DataArray1=result;
      
    });
    
  }

  getMatches(){
    
    this.profileid=this.route.snapshot.paramMap.get('profileid');
    var object = {};
        object['profileid'] = this.profileid;
        this.crudService.getMyProfile(object).subscribe(result => {

          const Data = new FormData();
          Data.append('gender',result.personal[0].name);
          Data.append('age',result.preference[0].age);
          Data.append('height',result.preference[0].height);
          Data.append('mstatus',result.preference[0].mstatus);
          Data.append('smoking',result.preference[0].smoking);
          Data.append('drinking',result.preference[0].drinking);
          Data.append('diet',result.preference[0].diet);
          Data.append('education',result.preference[0].education);
          Data.append('profession',result.preference[0].profession);
          Data.append('fvalues',result.preference[0].fvalues);
          Data.append('scases',result.preference[0].scases);
          Data.append('bodytype',result.preference[0].bodytype);
          Data.append('complexion',result.preference[0].complexion);

          var object = {};
          Data.forEach(function(value, key){
          object[key] = value;    
          });    
          
          this.crudService.get_matches(object).subscribe(result => {
            this.DataArray3=result;
            console.log(result); 
          });
          
        });
    
    
    
  }

  view(value){
    this.router.navigate(['profile',value]);
  }

  shortlist(value){
    var object = {};
        object['sprofileid'] = this.profileid;
        object['rprofileid'] = value;
      this.crudService.shortlist(object).subscribe(result => {
        if(result.message == "1"){
          alert("Candidate Shorlisted");
        }
        else{
          alert("Candidate Already Shorlisted");
        }
      });
  }

  send(val1,val2){
    var object = {};
        object['sprofileid'] = val2;
        object['status']=val1;
        object['rprofileid'] = this.profileid;
      this.crudService.send(object).subscribe(result => {
        if(result.message == "1"){
          alert("Action Submitted");
        }
      });
      this.getInterestReceived();
  }

  cancel(value){
    var object = {};
        object['sprofileid'] = this.profileid;
        object['rprofileid'] = value;
      this.crudService.cancel_req(object).subscribe(result => {
        if(result.message == "1"){
          alert("Request Cancelled");
        }
      });
      this.getInterestSent();
  }

  

  MustMatch(values){
    if(values.npassword == values.cpassword)   {
      return false;
    }
    else{
      return true;
    }
        
  }

  loadImage(){
    var object = {};
    object['profileid'] = this.profileid;
    this.crudService.getImage(object).subscribe(result => {
      //console.log(result.length);
      
        this.ImageData=result;
        //this.image=this.ImageData[0].image;
      
      
    })
  }

  deleteImage(data){
    var object = {};
   // data.forEach(function(value, key){
    object["profileid"] = data.profileid;
    object["image"] = data.image;
    object["privacy"] = data.privacy;
   // });
    this.crudService.deleteImage(object).subscribe(result => {
      
      if(result.message == "1"){
        alert('Image delete');
      }
      this.loadProfileImage();
      this.loadImage();    
    
    
  })
  }

  navigateBack(){
    //this.router.navigate(['searchresults']);
    this.location.back();
  }

  updateImage(data){
    var object = {};
   // data.forEach(function(value, key){
    object["profileid"] = data.profileid;
    object["image"] = data.image;
    object["privacy"] = data.privacy;
   // });
    this.crudService.changeImage(object).subscribe(result => {
      
      if(result.message == "1"){
        alert('Image updated');
      }
      this.loadProfileImage();
      this.loadImage();    
    
    
  })
  }

  loadProfileImage(){
    var object = {};
    object['profileid'] = this.profileid;
    this.crudService.getProfileImage(object).subscribe(result => {
        console.log(result);
        if(result == null){
          this.image="assets/user_photo/agency_profile.jpg";
        }
        else{
          this.image=result.image;
        }       
      
      
    })
  }

  showinbox(){
    this.display=false;
    this.inbox=true;
    this.sent=false;
    var object = {};
    object['rprofileid'] = this.profileid;
    this.crudService.getInbox(object).subscribe(result => {
      this.Mail=result;
      console.log(result);
    })
  }

  showsent(){
    this.display=false;
    this.inbox=false;
    this.sent=true;
    var object = {};
    object['rprofileid'] = this.profileid;
    this.crudService.getSent(object).subscribe(result => {
      this.Mail=result;
    })
  }

  display_message(val1,val2){
    this.display=true;
    this.inbox=false;
    this.sent=false;
    this.Form.controls['subject'].setValue(val1);
    this.Form.controls['message'].setValue(val2);
  }

  loadData(){
    this.profileid=this.route.snapshot.paramMap.get('profileid');
    var object = {};
        object['profileid'] = this.profileid;
        this.crudService.getMyProfile(object).subscribe(result => {

          this.DataArray4=result;
          
          this.contactForm.controls['email'].setValue(result.contact[0].email);
          this.contactForm.controls['mobile'].setValue(result.contact[0].mobile);
          this.contactForm.controls['landline'].setValue(result.contact[0].landline);
          this.contactForm.controls['address'].setValue(result.contact[0].address);
          this.contactForm.controls['city'].setValue(result.contact[0].city);
          this.contactForm.controls['state'].setValue(result.contact[0].state);
          this.contactForm.controls['country'].setValue(result.contact[0].country);

          this.preferenceForm.controls['page'].setValue(result.preference[0].age);
          this.preferenceForm.controls['pbodytype'].setValue(result.preference[0].bodytype);
          this.preferenceForm.controls['pmstatus'].setValue(result.preference[0].mstatus);
          this.preferenceForm.controls['pfvalues'].setValue(result.preference[0].fvalues);
          this.preferenceForm.controls['pdrinking'].setValue(result.preference[0].drinking);
          this.preferenceForm.controls['peducation'].setValue(result.preference[0].education);
          this.preferenceForm.controls['profession'].setValue(result.preference[0].profession);
          this.preferenceForm.controls['psmoking'].setValue(result.preference[0].smoking);
          this.preferenceForm.controls['pdiet'].setValue(result.preference[0].diet);
          this.preferenceForm.controls['pheight'].setValue(result.preference[0].height);
          this.preferenceForm.controls['pcomplexion'].setValue(result.preference[0].complexion);
          this.preferenceForm.controls['pscases'].setValue(result.preference[0].scases);

          this.familyForm.controls['fname'].setValue(result.family[0].fname);
          this.familyForm.controls['mname'].setValue(result.family[0].mname);
          this.familyForm.controls['fprof'].setValue(result.family[0].fprof);
          this.familyForm.controls['mprof'].setValue(result.family[0].mprof);
          this.familyForm.controls['nos'].setValue(result.family[0].nos);
          this.familyForm.controls['nob'].setValue(result.family[0].nob);
          this.familyForm.controls['fvalues'].setValue(result.family[0].fvalues);
          this.familyForm.controls['status'].setValue(result.family[0].status);

          this.educationForm.controls['education'].setValue(result.education[0].education);
          this.educationForm.controls['occupation'].setValue(result.education[0].occupation);
          this.educationForm.controls['ai'].setValue(result.education[0].income);
          this.educationForm.controls['edu_type'].setValue(result.education[0].edu_type);

          this.personalForm.controls['name'].setValue(result.personal[0].name);
          this.personalForm.controls['age'].setValue(result.personal[0].age);
          this.personalForm.controls['height'].setValue(result.personal[0].height);
          this.personalForm.controls['weight'].setValue(result.personal[0].weight);
          this.personalForm.controls['drinking'].setValue(result.personal[0].drinking);
          this.personalForm.controls['smoking'].setValue(result.personal[0].smoking);
          this.personalForm.controls['diet'].setValue(result.personal[0].diet);
          this.personalForm.controls['mstatus'].setValue(result.personal[0].mstatus);
          this.personalForm.controls['children'].setValue(result.personal[0].children);
          this.personalForm.controls['scases'].setValue(result.personal[0].scases);
          this.personalForm.controls['complexion'].setValue(result.personal[0].complexion);
          this.personalForm.controls['about'].setValue(result.personal[0].about);
          this.personalForm.controls['gender'].setValue(result.personal[0].gender);
          this.personalForm.controls['religion'].setValue(result.personal[0].religion);
          this.personalForm.controls['caste'].setValue(result.personal[0].caste);
          this.personalForm.controls['bodytype'].setValue(result.personal[0].bodytype);
          this.personalForm.controls['bd_grp'].setValue(result.personal[0].bd_grp);               
          

        });
  }

  personalUpdate(values){
    //console.log(values.name);
    //this.profileid=this.route.snapshot.paramMap.get('profileid');
    const Data = new FormData();
    Data.append('profileid',this.profileid);
    Data.append('name', values.name);
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
    //console.log(Data);
    var object = {};
    Data.forEach(function(value, key){
    object[key] = value;
    });
    this.crudService.updatePersonal(object).subscribe(result => {
      //this.router.navigate(['myprofile',this.profileid]);
      alert('Personal Details Updated');
    });
  }

  passUpdate(values){
    //console.log(values.name);
    //this.profileid=this.route.snapshot.paramMap.get('profileid');
    const Data = new FormData();
    Data.append('profileid',this.profileid);
    Data.append('password', values.password);
    Data.append('npassword', values.npassword);
    //Data.append('name', values.name);
    //console.log(Data);
    var object = {};
    Data.forEach(function(value, key){
    object[key] = value;
    });
    this.crudService.updatePassword(object).subscribe(result => {
      //this.router.navigate(['myprofile',this.profileid]);
      if(result.message == "1"){
        alert('Password Updated');
        
      }
      else{
        alert('Incorrect Current Password');
      }
      
      this.passwordForm.reset();
    });
  }

  imageUpload(values){
    //console.log(values.name);
    //this.profileid=this.route.snapshot.paramMap.get('profileid');
    const Data = new FormData();
    Data.append('profileid',this.profileid);
    Data.append('image', values.image);
    Data.append('privacy', values.privacy);
    //Data.append('name', values.name);
    //console.log(Data);
    var object = {};
    Data.forEach(function(value, key){
    object[key] = value;
    });
    this.crudService.updateImage(object).subscribe(result => {
      //this.router.navigate(['myprofile',this.profileid]);
      alert('Image Uploaded');
      this.loadImage();
      this.loadProfileImage();
      this.imageForm.reset();
    });
  }

  educationUpdate(values){
    //console.log(values.name);
    //this.profileid=this.route.snapshot.paramMap.get('profileid');
    const Data = new FormData();
    Data.append('profileid',this.profileid);
    Data.append('education', values.education);
    Data.append('occupation', values.occupation);
    Data.append('income', values.ai);
    Data.append('edu_type', values.edu_type);
    //console.log(Data);
    var object = {};
    Data.forEach(function(value, key){
    object[key] = value;
    });
    this.crudService.updateEducation(object).subscribe(result => {
      //this.router.navigate(['myprofile',this.profileid]);
      alert('Education Details Updated');
    });
  }

  familyUpdate(values){
    //console.log(values.name);
    //this.profileid=this.route.snapshot.paramMap.get('profileid');
    const Data = new FormData();
    Data.append('profileid',this.profileid);
    Data.append('fname', values.fname);
    Data.append('mname', values.mname);
    Data.append('fprofession', values.fprof);
    Data.append('mprofession',values.mprof);
    Data.append('nos', values.nos);
    Data.append('nob', values.nob);
    Data.append('fvalues', values.fvalues);
    Data.append('status', values.status);
    //Data.append('name', values.name);
    //console.log(Data);
    var object = {};
    Data.forEach(function(value, key){
    object[key] = value;
    });
    this.crudService.updateFamily(object).subscribe(result => {
      //this.router.navigate(['myprofile',this.profileid]);
      alert('Family Details Updated');
    });
  }

  contactUpdate(values){
    console.log(values.address);
    //this.profileid=this.route.snapshot.paramMap.get('profileid');
    const Data = new FormData();
    Data.append('profileid',this.profileid);
    Data.append('address', values.address);
    Data.append('city', values.city);
    Data.append('state', values.state);
    Data.append('country',values.country);
    Data.append('mobile', values.mobile);
    Data.append('landline', values.landline);
    Data.append('email', values.email);
    
    //Data.append('name', values.name);
    //console.log(Data);
    var object = {};
    Data.forEach(function(value, key){
    object[key] = value;
    });
    this.crudService.updateContact(object).subscribe(result => {
      //this.router.navigate(['myprofile',this.profileid]);
      alert('Contact Details Updated');
    });
  }

  preferenceUpdate(values){
    //console.log(values.name);
    //this.profileid=this.route.snapshot.paramMap.get('profileid');
    const Data = new FormData();
    Data.append('profileid',this.profileid);
    Data.append('profession', values.profession);
    Data.append('age', values.page);
    Data.append('education', values.peducation);
    Data.append('height', values.pheight);
    Data.append('mstatus', values.pmstatus);
    Data.append('bodytype', values.pbodytype);
    Data.append('complexion', values.pcomplexion);
    Data.append('scases', values.pscases);
    Data.append('smoking', values.psmoking);
    Data.append('drinking', values.pdrinking);
    Data.append('diet', values.pdiet);
    Data.append('fvalues', values.pfvalues);
    //console.log(Data);
    var object = {};
    Data.forEach(function(value, key){
    object[key] = value;
    });
    this.crudService.updatePreference(object).subscribe(result => {
      //this.router.navigate(['myprofile',this.profileid]);
      alert('Partner Preference Details Updated');
    });
  }

  

  editForm(){
    this.showupdate=true;
    this.personalForm.enable();
    this.preferenceForm.enable();
    this.educationForm.enable();
    this.familyForm.enable();
    this.contactForm.enable();    
  }

  uneditForm(){
    this.showupdate=false;
    this.personalForm.disable();
    this.preferenceForm.disable();
    this.educationForm.disable();
    this.familyForm.disable();
    this.contactForm.disable();
    this.loadData();    
  }


  reset(){
    this.showpd=false;
    this.showup=false;
    this.showeis=false;
    this.showeiss=true;
    this.showeir=false;
    this.showsl=false;
    this.showm=false;
    this.showoc=false;
    this.showum=false;
    this.showmi=false;
    this.showss=false;
    this.showcp=false;
    this.showca=false;

  }
  changepass(){
    this.reset();
    this.showcp=true;
  }
  closeacct(){
    this.reset();
    this.showca=true;
  }
  myprofile(){
    this.reset();
    this.showpd=true;
  }
  mail(){
    this.reset();
    this.showmi=true;
  }
  successstory(){
    this.reset();
    this.showss=true;
  }
  onlinechat(){
    this.reset();
    this.showoc=true;
  }
  updatephoto(){
    this.reset();
    this.showup=true;
  }
  interestsent(){
    this.reset();
    this.showeis=true;
  }
  show_shortlist(){
    this.reset();
    this.showsl=true;
  }
  show_matches(){
    this.reset();
    this.showm=true;
  }


}
