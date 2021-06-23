import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { TriviaAPIService } from '../trivia-api.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  categories: any = { result: 'hey' };
  selectedValueId: any;
  clickedValue: any;
  numOfCat!: any;
  takenQuestNum!: any;
  araswori: any;
  time:any;

  catToLocal(easy: any, medium: any, hard: any, num:any, sec:any) {
    num.value = '';
    num.style = 'border-color: black'
    easy.disabled = false;
    medium.disabled = false;
    hard.disabled = false;
    sec.disabled = false;

    localStorage.setItem('cat', JSON.stringify(this.selectedValueId))
    this.quiz.catGot = this.selectedValueId;

    this.quiz.getNumberOfQuestions().subscribe((numQuest) => {
      this.numOfCat = numQuest;
      console.log(numQuest);
    })

  }
  diffToLocal(num: any) {
    num.disabled = false;
    localStorage.setItem('diff', JSON.stringify(this.clickedValue))
  }
  checkSpell(border: any, start: any): void {
    if (this.clickedValue == 'easy') {
      if (this.takenQuestNum > this.numOfCat.category_question_count.total_easy_question_count || this.takenQuestNum == 0 || this.takenQuestNum == '' || !this.takenQuestNum) {
        border.style = `border-bottom-color:red!important; outline: none`;
        start.disabled = true;
      } else {
        start.disabled = false;
        border.style = `border-color:green; outline: none`;
      }
    } else if (this.clickedValue == 'medium') {
      if (this.takenQuestNum > this.numOfCat.category_question_count.total_medium_question_count || this.takenQuestNum == 0 || this.takenQuestNum == '' || !this.takenQuestNum) {
        border.style = `border-bottom-color:red!important; outline: none`;
        start.disabled = true;
      } else {
        start.disabled = false;
        border.style = `border-color:green; outline: none`
      }
    } else if (this.clickedValue == 'hard') {
      if (this.takenQuestNum > this.numOfCat.category_question_count.total_hard_question_count || this.takenQuestNum == 0 || this.takenQuestNum == '' || !this.takenQuestNum) {
        border.style = `border-bottom-color:red!important; outline: none`;
        start.disabled = true;
      } else {
        start.disabled = false;
        border.style = `border-bottom-color:rgb(46, 196, 182)!important; outline: none`;
      }
    }
  }

  constructor(public quiz: TriviaAPIService) {}


  ngOnInit(): void {
    this.quiz.getCategories().subscribe((cat) => {
      this.categories = cat;
      console.log(cat)
    })

    if(localStorage.getItem('time')){
      localStorage.removeItem('time')
      location.reload
    }
  
  }

  startQuiz() {
    this.quiz.catGot = this.selectedValueId;
    this.quiz.diffGot = this.clickedValue;
    if (!this.takenQuestNum || this.takenQuestNum > this.numOfCat.category_question_count.total_easy_question_count || this.takenQuestNum > this.numOfCat.category_question_count.total_medium_question_count || this.takenQuestNum > this.numOfCat.category_question_count.total_hard_question_count) {
      if (this.clickedValue == 'easy') {
        this.quiz.long = this.numOfCat.category_question_count.total_easy_question_count;
        localStorage.setItem('num', JSON.stringify(this.quiz.long))
      } else if (this.clickedValue == 'easy') {
        this.quiz.long = this.numOfCat.category_question_count.total_medium_question_count;
        localStorage.setItem('num', JSON.stringify(this.quiz.long))
      } else if (this.clickedValue == 'hard') {
        this.quiz.long = this.numOfCat.category_question_count.total_hard_question_count;
        localStorage.setItem('num', JSON.stringify(this.quiz.long))
      }
    } else if (this.takenQuestNum) {
      this.quiz.long = this.takenQuestNum;
      localStorage.setItem('num', JSON.stringify(this.quiz.long))
    }
 
    if(this.time){
      this.quiz.time = this.time;
      localStorage.setItem('time', JSON.stringify(this.quiz.time))
    }
   
    console.log(this.quiz.long, 'სიგრძე')
  }

}
