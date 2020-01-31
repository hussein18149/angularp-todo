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

      //sort array isChecked false
      this.toDoArray.sort((a,b) => {
        return a.isChecked - b.isChecked
      })
    });
  }
onAdd(activityTitle){
  this.toDoService.addActivity(activityTitle.value);
  activityTitle.value = null;
}
alterCheck($key: string,isChecked){
  this.toDoService.checkOrUncheckedActivity($key,!isChecked);
}
}
