  import { Component, inject } from '@angular/core';
  import { TaskService } from '../../services/task';
  import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
  import { NewTask } from '../../models/task.model';
  import { CommonModule } from '@angular/common';
  import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

  @Component({
    selector: 'app-add-task-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, MatSnackBarModule],
    templateUrl: './add-task-form.html',
    styleUrls: ['./add-task-form.css'],
  })

  export class AddTaskForm {

    private taskService = inject(TaskService);
    private formBuilder = inject(FormBuilder);
    private snackBar = inject(MatSnackBar);

    taskForm = this.formBuilder.group({
      'title': ['', Validators.required],
      'description': ['', Validators.required], 
    })

    onSubmit() {

      if (this.taskForm.invalid) {
        this.snackBar.open('Formulário inválido! Verifique os campos.', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        return;
      } 
      
      const newTask: NewTask = {
        title: this.taskForm.value.title!,
        description: this.taskForm.value.description || '',
      }

      this.taskService.addTask(newTask).subscribe({
        next: () => {
          this.snackBar.open('Tarefa adicionada com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.taskForm.reset();
        },
        error: () => {
          this.snackBar.open('Erro ao adicionar tarefa. Tente novamente.', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }

  }
