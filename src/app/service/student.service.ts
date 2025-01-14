import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { map, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private dbPath = '/students';

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<Student[]> {
    return this.db.list<Student>(this.dbPath).snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ id: c.payload.key, ...c.payload.val() } as Student))
      )
    );
  }

  create(student: Student): any {
    return this.db.list(this.dbPath).push(student);
  }

  update(id: string, value: any): Promise<void> {
    return this.db.object(`${this.dbPath}/${id}`).update(value);
  }

  delete(id: string): Promise<void> {
    return this.db.object(`${this.dbPath}/${id}`).remove();
  }
}

