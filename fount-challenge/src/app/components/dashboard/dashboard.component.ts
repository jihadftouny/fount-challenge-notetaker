import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/auth.service';
import { Note } from 'src/app/models/note';
import { DataService } from 'src/app/shared/data.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  notesList: Note[] = [];

  noteObj: Note = {
    id: '',
    title: '',
    content: '',
    userId: '',
  };

  id: string = '';
  title: string = '';
  content: string = '';

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    public afAuth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllNotes();
  }

  resetForm() {
    this.id = '';
    this.title = '';
    this.content = '';
  }

  async getAllNotes() {
    const userId = await this.authService.getCurrentUserId();

    this.dataService.getAllNotes().subscribe(
      (res) => {
        this.notesList = res
          .map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            return data;
          })
          .filter((note: Note) => note.userId === userId);
      },
      (err) => {
        this.openSnackBar('Error while fetching notes');
      }
    );
  }

  async addNote() {
    if (this.title == '' || this.content == '') {
      this.openSnackBar('Please fill all fields to create a note.');
      return;
    }
    this.noteObj.id = '';
    this.noteObj.title = this.title;
    this.noteObj.content = this.content;
    this.noteObj.userId = await this.authService.getCurrentUserId();

    this.dataService.addNote(this.noteObj);
    this.resetForm();
  }

  updateNote() {}

  deleteNote(note: Note) {
    if (
      window.confirm("Are you sure you want to delete '" + note.title + "'?")
    ) {
      this.dataService.deleteNote(note);
    }
  }

  logout() {
    this.authService.logout();
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
    });
  }
}
