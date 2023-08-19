import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Note } from '../models/note';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private afs: AngularFirestore, private snackBar: MatSnackBar) {}

  addNote(note: Note) {
    note.id = this.afs.createId();
    return this.afs
      .collection('/Notes')
      .add(note)
      .then(
        () => {
          this.openSnackBar('Note added successfully');
        },
        (err) => {
          this.openSnackBar('Error while adding note');
        }
      );
  }

  getAllNotes() {
    return this.afs.collection('/Notes').snapshotChanges();
  }

  deleteNote(note: Note) {
    return this.afs
      .doc('/Notes/' + note.id)
      .delete()
      .then(
        () => {
          this.openSnackBar('Note deleted successfully');
        },
        (err) => {
          this.openSnackBar('Error while deleting note');
        }
      );
  }

  updateNote(note: Note) {
    this.deleteNote(note);
    this.addNote(note);
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
    });
  }
}
