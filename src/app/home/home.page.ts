import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  task: string = '';  // This will hold the value of the input field
  tasks: string[] = [];  // This will hold the list of tasks

  constructor() {}

  ngOnInit() {
    this.loadTasks();
  }

  addTask() {
    if (this.task.trim().length > 0) {
      this.tasks.push(this.task);
      this.task = '';  // Clear the input field after adding the task
      this.saveTasks();
    }
  }

  deleteTask(task: string) {
    this.tasks = this.tasks.filter(t => t !== task);
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }
}
