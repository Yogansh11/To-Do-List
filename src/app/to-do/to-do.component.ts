import { ITask } from './../model/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  tasks : ITask [] = [];
  done : ITask [] = [];
  todoForm !: FormGroup;
  updateIndex !:any;
  isEditEnabled :boolean = false;
  constructor( private fb : FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item : ['', Validators.required]
    })
  }
  addTask(){
    this.tasks.push({
      description: this.todoForm.value.item,
      done:false
    })
    this.todoForm.reset();
  }
  onEdit(item : ITask , i : number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }
  updateTask(){
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }
  deleteTask(i : number){
    this.tasks.splice(i, 1)
  }
  deleteDoneTask(i : number){
    this.done.splice(i, 1)
  }
  deleteAllDone(){
    this.done.splice(0, this.done.length)
  }
  deleteAllTasks(){
    this.tasks.splice(0, this.tasks.length)

  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

