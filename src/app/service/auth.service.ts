import { inject, Injectable, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, user, User } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private fireauth: Auth = inject(Auth);
    private router: Router = inject(Router);
    public user: Signal<User | null | undefined> = toSignal(user(this.fireauth));


    login(email: string, password: string) {
        signInWithEmailAndPassword(this.fireauth, email, password)
            .then((userCredential) => {
                localStorage.setItem('token', 'true')
                console.log('User logged in:', userCredential.user);
                this.router.navigate(['/home']);
            })
            .catch((error) => {
                alert('Login failed: ' + error.message);
                this.router.navigate(['/login']);
            });
    }

    register(email: string, password: string) {
        createUserWithEmailAndPassword(this.fireauth, email, password)
            .then(res => {
                console.log("res is", res, email, password)
                if (res) {
                    alert("Registration Successful..");
                    this.router.navigate(['/login']);
                }
            }, err => {
                alert('Registration failed: ' + err.message);
                this.router.navigate(['/register']);
            })
    }

    logout() {
        this.fireauth.signOut().then(() => {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
        }, err => {
            alert(err.message)
        })
    }

    forgotPassword(email: string): Promise<void> {
        return sendPasswordResetEmail(this.fireauth, email)
            .then(() => {
                this.router.navigate(['/verify-mail']);
            })
            .catch((err) => {
                alert("Something went wrong!!");
                throw err;
            });
    }


    sendEmailforVerification(user: any) {
        user.sendEmailforVerification().then((res: any) => {
            this.router.navigate(['/verify-mail']);
        }, (err: any) => {
            alert("OOPS! Not able to send email..")
        })
    }

    public async loginWithGoogle() {
        await signInWithPopup(this.fireauth, new GoogleAuthProvider())
            .then(response => {
              if (response.user) {
                this.router.navigate(['/home']);
              } else {
                console.error('Login failed')
              }
            })
      }

    isLoggedIn(): boolean {
        const token = localStorage.getItem('token');
        return token ? true : false;
    }



}