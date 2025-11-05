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

    public feedbackMessage: string = '';
    public isSuccess: boolean = false;
    public isError: boolean = false;

    onSubmit() {

      if (this.taskForm.invalid) {
        this.feedbackMessage = 'Por favor, preencha todos os campos obrigatórios.';
        this.isError = true;
        return;
      } 
      
      const newTask: NewTask = {
        title: this.taskForm.value.title!,
        description: this.taskForm.value.description || '',
      }

      this.taskService.addTask(newTask).subscribe({
        next: (response) => {
          this.feedbackMessage = 'Tarefa adicionada com sucesso!';
          this.isSuccess = true;
          this.taskForm.reset();
        },
        error: (error) => {
          this.feedbackMessage = 'Erro ao adicionar a tarefa. Tente novamente.';
          this.isError = true;
        }
      });
    }

  }
