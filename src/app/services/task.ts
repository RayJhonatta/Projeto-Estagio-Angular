import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { NewTask } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly API_URL = 'http://127.0.0.1:8000/api/tasks';

  private http = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.API_URL}/listar`);
  }

  addTask(task: NewTask): Observable<Task> {
    return this.http.post<Task>(`${this.API_URL}/nova`, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.API_URL}/${task.id}/editar`, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${taskId}/remover`);
  }
}
