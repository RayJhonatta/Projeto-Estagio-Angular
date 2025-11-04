import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})

export class TaskList implements OnInit {

  private service = inject(TaskService);
  tasks: Task[] = [];

  ngOnInit(): void {
    this.service.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }
}
