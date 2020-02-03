import { TodoService } from './todo/todo.service';
import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers : [TodoService]
})
export class TodoComponent implements OnInit {
  toDoArray:any[];
  date: Date;

  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.getTodoList().snapshotChanges()
    .subscribe(activity=>{
      this.toDoArray = [];
      activity.forEach(element=>{
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoArray.push(x);
        
      })

      
      this.toDoArray.sort((a,b) => {
        return a.isMarked - b.isMarked
      })
    });
    this.date = new Date();
  this.date.setDate( this.date.getDate() );
  }
onAdd(activityTitle: { value: string;}){
  this.toDoService.addActivity(activityTitle.value);
  activityTitle.value = null;
}
alterMarked($key: string,isMarked: any){
  this.toDoService.markedOrUnmarkedActivity($key,!isMarked);
  }
onDelete($key : string){
  this.toDoService.removeActivity($key);
}
}
