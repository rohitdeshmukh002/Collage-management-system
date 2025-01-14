import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, docSnapshots, Firestore, getDoc, getDocs, query, QuerySnapshot, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private teacherdata  = 'teanaches'; 

  constructor(private firestore : Firestore) { }

  getall(): Observable<Teacher[]>{
    const getteacher = collection (this.firestore, this.teacherdata);
    const teacherquery = query(getteacher);

    return new Observable<Teacher[]>((observer) =>{
      getDocs(teacherquery).then((QuerySnapshot) =>{
        const teachers : Teacher[] =[];
        QuerySnapshot.forEach((doc) =>{
          const data = doc.data();
          const teacher: Teacher={
            id: doc.id,
            fname: data['fname'],
            lname : data['lname'],
            salary : data['salary'],
            gender: data['gender'],
            email: data['email'],
            password: data['password']
          };
          teachers.push(teacher);
        });
        observer.next(teachers);
        observer.complete();
      }).catch((error)=>{
        observer.error("error in fetaching data: " +error);
      });
    });
  }


  create(teacher : Teacher){
    const getteacher =collection(this.firestore, this.teacherdata);
    return addDoc(getteacher, {...teacher});
  }

  delete(teacher: Teacher) {
    const teach = doc(this.firestore, `${this.teacherdata}/${teacher.id}`); // Removed the extra space
    return deleteDoc(teach);
  }

  update(teacher : Teacher){
    const teach = doc(this.firestore, `${this.firestore}/${teacher.id}`);

    return updateDoc(teach,{
      fname: teacher.fname,
      lname: teacher.lname,
      salary: teacher.salary,
      gender: teacher.gender,
      email: teacher.email,
      password: teacher.password
    });
  }

  getTeacherbyId(id: string):Observable<Teacher | null>{

    const teacherdoc = doc(this.firestore, `${this.teacherdata}/${id}`);

    return new Observable<Teacher | null>((observer) =>{
      getDoc(teacherdoc).then((docSnapshots) =>{
        if(docSnapshots.exists()){
          const data = docSnapshots.data();
          const teacher: Teacher ={
            id:docSnapshots.id,
            fname : data['fname'],
            lname:data['lname'],
            salary: data['salary'],
            gender: data['gender'],
            email: data['email'],
            password: ''
          };
          observer.next(teacher);
        }else{
          observer.next(null);
        }
        observer.complete();
      }).catch((error) =>{
        observer.error(error);
      })
    })
  }
}
