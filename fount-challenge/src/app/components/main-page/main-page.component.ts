import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  newNote: { title: string; content: string } = { title: '', content: '' };
  notes: { title: string; content: string }[] = [];

  constructor() {}

  ngOnInit(): void {
    // Fetch notes or initialize them if needed
  }

  createNote(): void {
    this.notes.push({ ...this.newNote });
    this.newNote = { title: '', content: '' };
  }
}
