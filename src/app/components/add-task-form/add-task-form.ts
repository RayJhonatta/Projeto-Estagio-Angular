  import { Component, inject } from '@angular/core';
  import { TaskService } from '../../services/task';
  import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
  import { NewTask } from '../../models/task.model';
  import { CommonModule } from '@angular/common';

  @Component({
    selector: 'app-add-task-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './add-task-form.html',
    styleUrls: ['./add-task-form.css'],
  })

  export class AddTaskForm {

    private taskService = inject(TaskService);
    private formBuilder = inject(FormBuilder);

    taskForm = this.formBuilder.group({
      'title': ['', Validators.required],
      'description': ['', Validators.required], 
    })

    onSubmit() {

      if (this.taskForm.invalid) {
        console.log('Formulário inválido, por favor verifique os campos.');
        return;
      } 
      
      const newTask: NewTask = {
        title: this.taskForm.value.title!,
        description: this.taskForm.value.description || '',
      }

      this.taskService.addTask(newTask).subscribe({
        next: (response) => {
          console.log('Tarefa adicionada com sucesso:', response);
          this.taskForm.reset();
        },
        error: (error) => {
          console.error('Erro ao adicionar tarefa:', error);
        }
      });
    }

  }
