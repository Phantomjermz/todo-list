import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage {
  newTask: string = '';
  tasks: { text: string, completed: boolean }[] = [];
  editIndex: number | null = null;
  editTask: string = '';

  constructor() {
    this.loadTasks();
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ text: this.newTask.trim(), completed: false });
      this.newTask = '';
      this.saveTasks();
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  toggleEdit(index: number) {
    this.editIndex = this.editIndex === index ? null : index;
    this.editTask = this.editIndex !== null ? this.tasks[index].text : '';
  }

  saveEdit(index: number) {
    if (this.editTask.trim()) {
      this.tasks[index].text = this.editTask.trim();
      this.editTask = '';
      this.editIndex = null;
      this.saveTasks();
    }
  }

  toggleCompletion(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }
}
