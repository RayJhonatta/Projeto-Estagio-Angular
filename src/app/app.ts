import { Component, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { AddTaskForm } from "./components/add-task-form/add-task-form";
import { TaskList } from "./components/task-list/task-list";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddTaskForm, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Projeto-Estagio-Angular');
}
