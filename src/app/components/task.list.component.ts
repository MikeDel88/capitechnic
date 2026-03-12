import { Component, signal, output, OnInit, input, effect } from '@angular/core';
import { Task } from '../model/task.interface';
import { TaskService } from '../service/task.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Tasks</h1>
    <ul>
        @for (task of tasks(); track task.id) {
            <li [ngStyle]="{'font-weight': task.id === taskSelected()?.id ? 'bold' : 'normal'}" (click)="selectTask(task)">
                @if(taskSelected()?.id == task.id) { 
                    {{ taskSelected()?.title }}
                } @else {
                    {{ task.title }}
                }
            </li>
        }
        @if(errorMessage() != null) {
            <p>{{ errorMessage() }}</p>
        }
    </ul>
  `
})
export class TaskListComponent implements OnInit {
    
    readonly tasks = signal<Task[]>([]);
    readonly taskSelected = input<Task | null>(null);
    readonly selectTaskEvent = output<Task>();
    errorMessage = signal<string | null>(null);

    selectTask(task: Task) {
        this.selectTaskEvent.emit(task);
    }

    private readonly updateEffect = effect(() => {
    const selected = this.taskSelected();
        if (selected) {
        this.tasks.update(tasks => tasks.map(t => t.id === selected.id && t !== selected ? selected : t));
        }
    });

     constructor(private taskService: TaskService) {}

    loadTasks() {
    this.taskService.getTasks().subscribe({
        next: (datas: Task[]) => {
            this.tasks.set(datas);
            if(datas.length > 0)
                this.selectTask(datas[0])
        },
        error: (err: Error) => {
            this.errorMessage.set(err.message)
        }});
    }

    ngOnInit(): void {
        this.loadTasks();
    }
}