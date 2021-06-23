import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})



export class TriviaAPIService {

  catGot: any = JSON.parse(localStorage.getItem('cat') || '{}');
  diffGot: any = JSON.parse(localStorage.getItem('diff') || '{}');
  long: any = JSON.parse(localStorage.getItem('num') || '{}');
  time:any = JSON.parse(localStorage.getItem('time') || '{}');

  constructor(private http: HttpClient) {
  }


  getCategories() {
    return this.http.get('https://opentdb.com/api_category.php')
  }
  getQuestions() {
    return this.http.get(`https://opentdb.com/api.php?amount=${this.long}&category=${this.catGot}&difficulty=${this.diffGot}`)
  }
  getNumberOfQuestions(){
    return this.http.get(`https://opentdb.com/api_count.php?category=${this.catGot}`)
  }


}
