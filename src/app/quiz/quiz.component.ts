import { Component, OnInit } from '@angular/core';
import { TriviaAPIService } from '../trivia-api.service';

const answersArray: any[] = []
const correctAnswers: any[] = []


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  gotQuestion: any = 'hello';
  quizAll: any = {
    results: ['nth']
  };
  countQuest: number = 0;
  markedAnswer!: any;
  correctAnsw = correctAnswers;
  corAnswCalc: number = 0;
  submitBtn: boolean = false;
  nextBtn: boolean = true;
  showResults: boolean = false;

  constructor(public quiz: TriviaAPIService) {
    console.log(this.quiz.catGot, 'და', this.quiz.diffGot)
  }

  ngOnInit(): void {
    console.log(this.quizAll, 'ვამოწმებ')
    try {
      this.quiz.getQuestions().subscribe((quiz) => {
        this.quizAll = quiz;

        this.quizAll.results.map((el: any) => {
          answersArray.push(el)
        });
        answersArray.map((el: any) => {
          el.incorrect_answers.splice(Math.floor(Math.random() * 4), 0, el.correct_answer)
        })
        this.quizAll.results.map((cor: any) => { this.correctAnsw.push(cor.correct_answer) })
        console.log(this.quizAll, 'მიღებული ქვიზი')
      })
    } catch (err) {
      console.log('არ მუშაობს')
    }

    if(this.time != 0 || this.time != '' || this.time != ' '){
      let i = setInterval(()=>{
        if (this.time) {
          if(this.forTime ==  this.quizAll.results.length){       
            clearInterval(i);
            console.log('cleared')
          }else{
            this.time--
          }
        }else if(this.time == 0){
          this.nextQuestion()
          if(this.forTime ==  this.quizAll.results.length){       
            clearInterval(i);
            console.log('cleared')
          }else {
            this.time = this.quiz.time;
          }
        }
      },1000)
    }    
  }
  
  forTime:number = 0;
  time:any = this.quiz.time

  nextQuestion() {
    
    this.forTime++;
    this.countQuest++;
    console.log(this.forTime, 'fortime')
    this.time = this.quiz.time;
    
    if (this.countQuest == this.quizAll.results.length) {
      this.countQuest--;
      this.submitBtn = true;
      this.nextBtn = false;
    }
    console.log('next');

    if (this.markedAnswer == this.correctAnsw[this.countQuest - 1]) {
      console.log('სწორია: ', this.correctAnsw[this.countQuest - 1])
      this.corAnswCalc++;
    }
    this.markedAnswer = '';

    console.log(this.corAnswCalc)
    console.log(this.countQuest, 'countQuest')
    console.log(this.quizAll.results.length, 'length')
    console.log(this.submitBtn)
  }

  submitNow() {
    this.showResults = true;
    this.submitBtn = false;
  }







}
