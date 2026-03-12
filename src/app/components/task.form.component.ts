import { Component, input, output, signal } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import { Task } from '../model/task.interface';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div>
        <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
            <input type="text" [placeholder]="task()?.title || 'titre'" formControlName="title" title="title" />
            <button type="submit" [disabled]="!taskForm.valid">Enregistrer</button>
        </form>
        @if(errorMessage() != null) {
          <p>{{ errorMessage() }}</p>
        }
    </div>
  `
})
export class TaskFormComponent {
    
  readonly task = input<Task | null>(null);

  readonly updatedTaskEvent = output<Task>();
  errorMessage = signal<string | null>(null);

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
  });
    
  constructor(private taskService: TaskService) {}

  onSubmit() {
    const updatedTask = {
        ...this.task(),
        ...this.taskForm.getRawValue()
    } as Task;
    
    this.taskService.updateTask(updatedTask).subscribe({
        next: (task: Task) => {
            this.updatedTaskEvent.emit(task);
            this.taskForm.reset();   
        },
        error: (err: Error) => {
            this.errorMessage.set(err.message)
        }
    });
  }
}