import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule,FormControl,Validators} from "@angular/forms";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdvancesearchComponent } from './advancesearch/advancesearch.component';
import { QuicksearchComponent } from './quicksearch/quicksearch.component';
import { ProfileidsearchComponent } from './profileidsearch/profileidsearch.component';
import { ContactdetailsComponent } from './contactdetails/contactdetails.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ViewComponent } from './crud/view/view.component';
import { CreateComponent } from './crud/create/create.component';
import { UpdateComponent } from './crud/update/update.component';
import { ReadComponent } from './crud/read/read.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchesComponent } from './searches/searches.component';
import { MessageComponent } from './message/message.component';
import { MembershipComponent } from './membership/membership.component';
import { MailComponent } from './mail/mail.component';

@NgModule({
  declarations: [
    AppComponent,
    AdvancesearchComponent,
    QuicksearchComponent,
    ProfileidsearchComponent,
    ContactdetailsComponent,
    ProfileComponent,
    SearchresultsComponent,
    MyprofileComponent,
    ViewComponent,
    CreateComponent,
    UpdateComponent,
    ReadComponent,
    MenuComponent,
    HomeComponent,
    InfoComponent,
    FooterComponent,
    SearchesComponent,
    MessageComponent,
    MembershipComponent,
    MailComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
