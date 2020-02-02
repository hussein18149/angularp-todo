import { Injectable } from '@angular/core';
import {AngularFireDatabaseModule,AngularFireList, AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  toDolist: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }


  getTodoList(){
    this.toDolist = this.firebasedb.list('titles');
    return this.toDolist;
  }

  addActivity(activity: string){
    this.toDolist.push({
      activity: activity,
      isMarked: false
    });
  }
  markedOrUnmarkedActivity($key: string, flag: boolean){
    this.toDolist.update($key,{isMaarked: flag});
  }
  removeActivity($key: string){
    this.toDolist.remove($key);
  }
}
