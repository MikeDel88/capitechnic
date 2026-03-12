import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Task } from '../model/task.interface'
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  
  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  getTasks(): Observable<Task[]> {
    return this.http.get(`${this.apiService.baseUrl}/items`).pipe(
      map((datas) => {
        return Object.entries(datas).map(([key, value]: [string, any]) => ({
                    id: +key,
                    title: value?.title || '',
                    description: value?.description || '',
                    date: value?.date || '',
                    titleHistory: value?.titleHistory || [] 
                }));
        })
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiService.baseUrl}/api/items/${task.id}`, task).pipe(
      map((taskFromApi) => {
        console.log("updated", taskFromApi)
        return {
        ...taskFromApi,
        id: task.id
        }
      }));
  }
}