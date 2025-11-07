import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})

export class TaskList implements OnInit {

  private service = inject(TaskService);
  tasks: Task[] = [];
status: any;
description: any;
title: any;

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.service.getTasks().subscribe({
      next: (response: any) => {
        const taskArray: Task[] = response.data || response;
        this.tasks = taskArray;
      },
      error: (error) => {
        console.error('Erro ao buscar tarefas::', error);
        this.tasks = [];
      }
    });
  }
}
