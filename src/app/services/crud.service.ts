import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {retry,catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  public url='http://localhost/web_api/';
  constructor(private http:HttpClient) { }
  Data :any[];
  profileid:string;
  rprofileid:string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  } 

  pass(data){
    this.Data=data;
  }

  get(){
    return this.Data;
  }

  initializeId(value){
    this.profileid=value;
  }

  get_seesions():Observable<any>{
    return this.http.get<any>(this.url+'get_sessions.php');
  }

  get_search_seesions():Observable<any>{
    return this.http.get<any>(this.url+'get_search_sessions.php');
  }

  sendMail(data):Observable<any>{
    return this.http.post<any>(this.url+'send_message.php',JSON.stringify(data), this.httpOptions);
  }

  getBasicInfo(data):Observable<any>{
    return this.http.post<any>(this.url+'basic_info.php',JSON.stringify(data), this.httpOptions);
  }
  
  updatePersonal(data):Observable<any>{
    return this.http.post<any>(this.url+'update_personal.php',JSON.stringify(data), this.httpOptions);
  }

  updateEducation(data):Observable<any>{
    return this.http.post<any>(this.url+'update_education.php',JSON.stringify(data), this.httpOptions);
  }

  updateContact(data):Observable<any>{
    return this.http.post<any>(this.url+'update_contact.php',JSON.stringify(data), this.httpOptions);
  }

  updateFamily(data):Observable<any>{
    return this.http.post<any>(this.url+'update_family.php',JSON.stringify(data), this.httpOptions);
  }

  updatePreference(data):Observable<any>{
    return this.http.post<any>(this.url+'update_preference.php',JSON.stringify(data), this.httpOptions);
  }

  updateImage(data):Observable<any>{
    return this.http.post<any>(this.url+'photo_upload.php',JSON.stringify(data), this.httpOptions);
  }

  updatePassword(data):Observable<any>{
    return this.http.post<any>(this.url+'change_password.php',JSON.stringify(data), this.httpOptions);
  }

  getMyProfile(data):Observable<any>{
    return this.http.post<any>(this.url+'pid_results.php',JSON.stringify(data), this.httpOptions);
  }

  getProfile(data):Observable<any>{
    return this.http.post<any>(this.url+'pid.php',JSON.stringify(data), this.httpOptions);
  }

  getProfileImage(data):Observable<any>{
    return this.http.post<any>(this.url+'ProfilePhoto.php',JSON.stringify(data), this.httpOptions);
  }

  getImage(data):Observable<any>{
    return this.http.post<any>(this.url+'loadImage.php',JSON.stringify(data), this.httpOptions);
  }

  deleteImage(data):Observable<any>{
    return this.http.post<any>(this.url+'delete.php',JSON.stringify(data), this.httpOptions);
  }

  changeImage(data):Observable<any>{
    return this.http.post<any>(this.url+'update.php',JSON.stringify(data), this.httpOptions);
  }

  getInbox(data):Observable<any>{
    return this.http.post<any>(this.url+'display_message.php',JSON.stringify(data), this.httpOptions);
  }

  getSearch(data):Observable<any>{
    return this.http.post<any>(this.url+'search.php',JSON.stringify(data), this.httpOptions);
  }

  getSearchResult(data):Observable<any>{
    return this.http.post<any>(this.url+'searchresults.php',JSON.stringify(data), this.httpOptions);
  }

  getQuickSearchResult(data):Observable<any>{
    return this.http.post<any>(this.url+'quicksearch.php',JSON.stringify(data), this.httpOptions);
  }

  getAdvanceSearchResult(data):Observable<any>{
    return this.http.post<any>(this.url+'advancesearch.php',JSON.stringify(data), this.httpOptions);
  }

  getInterestSent(data):Observable<any>{
    return this.http.post<any>(this.url+'express_req_sent.php',JSON.stringify(data), this.httpOptions);
  }

  getInterestReceived(data):Observable<any>{
    return this.http.post<any>(this.url+'express_req_received.php',JSON.stringify(data), this.httpOptions);
  }

  send(data):Observable<any>{
    return this.http.post<any>(this.url+'update_req_send.php',JSON.stringify(data), this.httpOptions);
  }
  
  register(data):Observable<any>{
    return this.http.post<any>(this.url+'create.php',JSON.stringify(data), this.httpOptions);
  }

  create(data):Observable<any>{
    return this.http.post<any>(this.url+'try.php',JSON.stringify(data), this.httpOptions);
  }

  login(data):Observable<any>{
    return this.http.post<any>(this.url+'login.php',JSON.stringify(data), this.httpOptions);
  }
  shortlist(data):Observable<any>{
    return this.http.post<any>(this.url+'shortlist.php',JSON.stringify(data), this.httpOptions);
  }
  get_shortlist(data):Observable<any>{
    return this.http.post<any>(this.url+'get_shortlist.php',JSON.stringify(data), this.httpOptions);
  }
  get_matches(data):Observable<any>{
    return this.http.post<any>(this.url+'matches.php',JSON.stringify(data), this.httpOptions);
  }
  remove_shortlist(data):Observable<any>{
    return this.http.post<any>(this.url+'delete_shortlist.php',JSON.stringify(data), this.httpOptions);
  }
  sendRequest(data):Observable<any>{
    return this.http.post<any>(this.url+'send_req.php',JSON.stringify(data), this.httpOptions);
  }
  cancel_req(data):Observable<any>{
    return this.http.post<any>(this.url+'delete_req.php',JSON.stringify(data), this.httpOptions);
  }
  refine_search(data):Observable<any>{
    return this.http.post<any>(this.url+'refinesearch.php',JSON.stringify(data), this.httpOptions);
  }
  logout():Observable<any>{
    return this.http.get<any>(this.url+'logout.php');
  }
  get_followers(data):Observable<any>{
    return this.http.post<any>(this.url+'get_followers.php',JSON.stringify(data), this.httpOptions);
  }
  get_chats(data):Observable<any>{
    return this.http.post<any>(this.url+'get_chats.php',JSON.stringify(data), this.httpOptions);
  }
  send_chats(data):Observable<any>{
    return this.http.post<any>(this.url+'send_online_chat.php',JSON.stringify(data), this.httpOptions);
  }
  get_image(data):Observable<any>{
    return this.http.post<any>(this.url+'get_image.php',JSON.stringify(data), this.httpOptions);
  }
  get_status(data):Observable<any>{
    return this.http.post<any>(this.url+'get_status.php',JSON.stringify(data), this.httpOptions);
  }
  getSent(data):Observable<any>{
    return this.http.post<any>(this.url+'display_sent_message.php',JSON.stringify(data), this.httpOptions);
  }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  getProducts(){
    return this.http.get(this.url+'veiw.php');
  }

  getProductDetails(id){
    return this.http.get(this.url+'view_1.php?='+id);
  }

  createProduct(data){
    return this.http.post(this.url+'create.php',data);
  }

  updateProduct(data){
    return this.http.post(this.url+'update.php',data);
  }

  deleteProduct(id){
    return this.http.get(this.url+'delete.php?id='+id);
  }
}
