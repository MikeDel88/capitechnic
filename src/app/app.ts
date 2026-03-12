import { Component, signal } from '@angular/core';
import { TaskListComponent } from './components/task.list.component';
import { TaskFormComponent } from './components/task.form.component';
import { TaskDetailComponent } from './components/task.detail.component';
import { Task } from './model/task.interface';

@Component({ 
  selector: 'app-root',
  imports: [TaskListComponent, TaskFormComponent, TaskDetailComponent],
  template: `
    <div>
      <app-task-list [taskSelected]="taskSelected()" (selectTaskEvent)="selectedTask($event)"/>
      @if(taskSelected() != null) {
        <app-task-form [task]="taskSelected()" (updatedTaskEvent)="selectedTask($event)"/>
        <app-task-detail [task]="taskSelected()"/>
      }
    </div>
  `
})
export class App {

  taskSelected = signal<Task | null>(null)
  
  selectedTask(task: Task) {
    this.taskSelected.set(task)
  }

}
