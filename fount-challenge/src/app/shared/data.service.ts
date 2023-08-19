import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private afs: AngularFirestore) {}

  addNote(note: Note) {
    note.id = this.afs.createId();
    return this.afs.collection('/Notes').add(note);
  }

  getAllNotes() {
    return this.afs.collection('/Notes').snapshotChanges();
  }

  deleteNote(note: Note) {
    return this.afs.doc('/Notes/' + note.id).delete();
  }

  updateNote(note: Note) {
    this.deleteNote(note);
    this.addNote(note);
  }
}
