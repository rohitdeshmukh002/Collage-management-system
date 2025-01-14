import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { Observable } from 'rxjs';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, query, QuerySnapshot, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private Studentdata = 'students';

  constructor(private firestore: Firestore) { }

  getall(): Observable<Student[]> {
    const getstudent = collection(this.firestore, this.Studentdata);
    const studquery = query(getstudent);

    return new Observable<Student[]>((observer) => {
      getDocs(studquery).then((QuerySnapshot) => {
        const students: Student[] = [];
        QuerySnapshot.forEach((doc) => {
          const data = doc.data();
          const student: Student = {
            id: doc.id,
            Firstname: data['Firstname'],
            lastname: data['lastname'],
            gender: data['gender'],
            email: data['email'],
            password: data['password']
          };
          students.push(student);
        });
        observer.next(students);
        observer.complete();
      }).catch((error) => {
        observer.error("error in fetching data: " + error);
      });
    });
  }

  create(student: Student) {
    const getstudent = collection(this.firestore, this.Studentdata);
    return addDoc(getstudent, { ...student });
  }

  delete(student: Student) {
    const stud = doc(this.firestore, `${this.Studentdata}/${student.id}`);
    return deleteDoc(stud);
  }

  update(student: Student) {
    const stud = doc(this.firestore, `${this.Studentdata}/${student.id}`);
    // Match the case with how data is stored
    return updateDoc(stud, {
      Firstname: student.Firstname,
      lastname: student.lastname,
      gender: student.gender,
      email: student.email
    });
  }

  getStudentById(id: string): Observable<Student | null> {
    const studentDoc = doc(this.firestore, `${this.Studentdata}/${id}`);

    return new Observable<Student | null>((observer) => {
      getDoc(studentDoc).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const student: Student = {
            id: docSnapshot.id,
            Firstname: data['Firstname'], // Match the case with stored data
            lastname: data['lastname'],
            gender: data['gender'],
            email: data['email'],
            password: ''
          };
          observer.next(student);
        } else {
          observer.next(null);
        }
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }
}