import { Injectable } from '@angular/core';
import {AngularFireDatabaseModule,AngularFireList, AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  //declaration of firebase data  that will be stored and collected from
  toDolist: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

//a function that is responsible for getting data from firebase db 
  getTodoList(){
    this.toDolist = this.firebasedb.list('titles');
    return this.toDolist;
  }

  //a function that is meant to add to do into the firrbase with two objective
  addActivity(activity: string){
    this.toDolist.push({
      activity: activity,
      date: Date,
      isMarked: false
    });
  }
  //a function to mark activities when they are fully finished
  markedOrUnmarkedActivity($key: string, flag: boolean){
    this.toDolist.update($key,{isMaarked: flag});
  }
  //a function that is meant to remove data from firebase db
  removeActivity($key: string){
    this.toDolist.remove($key);
  }
}
