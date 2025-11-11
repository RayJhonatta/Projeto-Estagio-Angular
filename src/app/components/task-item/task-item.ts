import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tr[appTaskItem]',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './task-item.html',
  styleUrls: ['./task-item.css'],
})
export class TaskItem {

  private service = inject(TaskService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  
  @Input() task!: Task; 
  @Output() taskDeleted = new EventEmitter<number>(); 
  
  isEditing: boolean = false; 
  editForm!: FormGroup; 

  onEdit(): void {
    this.editForm = this.fb.group({
        title: [this.task.title, Validators.required],
        description: [this.task.description, Validators.required],
        completed: [this.task.completed || false], 
    });
    this.isEditing = true;
  }
  
  onCancel(): void {
    this.isEditing = false;
  }

  onSave(): void {
    if (this.editForm.invalid) return; 

    const updatedTask: Task = { 
      ...this.task, 
      ...this.editForm.value,
      id: this.task.id 
    };

    this.service.updateTask(updatedTask).subscribe({
        next: (savedTask) => {
            this.task = savedTask;  
            this.isEditing = false;
            this.snackBar.open('Tarefa atualizada com sucesso!', 'Fechar', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
        },
        error: () => {
            this.isEditing = false; 
            this.snackBar.open('Erro ao atualizar tarefa. Tente novamente.', 'Fechar', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
        }
    });
  }

  onDelete(): void {
    if (!confirm(`Excluir "${this.task.title}"?`)) return;
    this.service.deleteTask(this.task.id).subscribe({
        next: () => {
            this.taskDeleted.emit(this.task.id); 
            this.snackBar.open('Tarefa excluída com sucesso!', 'Fechar', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
        },
        error: (err) => {
          this.snackBar.open('Erro ao excluir tarefa. Tente novamente.', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
      }
    });
  }
}