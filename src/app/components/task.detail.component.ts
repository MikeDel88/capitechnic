import { Component, input } from '@angular/core';
import { Task } from '../model/task.interface';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  template: `
    <div>
        <p>{{ task()?.description || ''}}</p>
        <p>{{ task()?.date || ''}}</p>
        <p>Historique des titres</p>
        <ul>
            @for (titleHistory of task()?.titleHistory || []; track titleHistory) {
                <li>{{ titleHistory }}</li>
            }
        </ul>
    </div>
  `
})
export class TaskDetailComponent {
    readonly task = input<Task | null>(null)
}