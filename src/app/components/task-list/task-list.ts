import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { AddTaskForm } from "../add-task-form/add-task-form";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, AddTaskForm],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
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
