import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private baseUrl = 'YOUR_FIREBASE_API_URL'; // Replace with your Firebase API URL

  constructor(private http: HttpClient) {}

  createNote(note: { title: string; content: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/notes.json`, note);
  }

  getNotes(): Observable<{ id: string; title: string; content: string }[]> {
    return this.http
      .get<{ [key: string]: { title: string; content: string } }>(
        `${this.baseUrl}/notes.json`
      )
      .pipe(
        map((responseData) => {
          const notes: { id: string; title: string; content: string }[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              notes.push({ id: key, ...responseData[key] });
            }
          }
          return notes;
        })
      );
  }
}
