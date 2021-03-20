import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvancesearchComponent } from './advancesearch/advancesearch.component';
import { QuicksearchComponent } from './quicksearch/quicksearch.component';
import { ProfileidsearchComponent } from './profileidsearch/profileidsearch.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactdetailsComponent } from './contactdetails/contactdetails.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import {ViewComponent} from './crud/view/view.component';
import {CreateComponent} from './crud/create/create.component';
import {UpdateComponent} from './crud/update/update.component';
import {ReadComponent} from './crud/read/read.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { MessageComponent } from './message/message.component';
import { MembershipComponent } from './membership/membership.component';
import { MailComponent } from './mail/mail.component';
import { SearchesComponent } from './searches/searches.component';


const routes: Routes = [{
  path:'advance',component: AdvancesearchComponent
},{
  path:'home',component: HomeComponent
},{
  path:'info/:profileid',component: InfoComponent
},{
  path:'create',component: CreateComponent
},{
  path:'update/:id',component: UpdateComponent
},{
  path:'view/:id',component: ReadComponent
},{
  path:'quick',component: QuicksearchComponent
},{
  path:'profileidsearch',component: ProfileidsearchComponent
},{
  path:'profile/:profileid',component: ProfileComponent
},{
  path:'contactdetails',component: ContactdetailsComponent
},{
  path:'searchresults',component:SearchresultsComponent
},{
  path:'myprofile/:profileid',component:MyprofileComponent
},{
  path:'message',component:MessageComponent
},{
  path:'membership',component:MembershipComponent
},{
  path:'mail',component:MailComponent
},{
  path: '',   redirectTo: '/home', pathMatch: 'full'
},{
  path:'searchs',component:SearchesComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
