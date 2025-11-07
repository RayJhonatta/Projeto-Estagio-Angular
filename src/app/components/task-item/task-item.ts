import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { TaskService } from '../../services/task';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
@Component({
  selector: 'app-task-item',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {

  private service = inject(TaskService);
  private fb = inject(FormBuilder);

  startEdit(task: Task): void {
    
  }
}
