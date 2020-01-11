import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';



import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators'
import { User } from './user';
import { environment } from 'src/environments/environment';

import decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt/src/jwthelper.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  API:string = environment.API_ENDPOINT;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private http:HttpClient
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          console.log('ERROR');
          return of(null)
        }
      })
    );


  }

  sesion(user){
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(this.API+"login",user).subscribe(res=>{
        console.log("RESPUESTA /LOGIN :  ", res);
        resolve(res);
      },error=>{
        reject(error.error);
      })
    });
  }








  sigInWithEmailPassword(user){
    return new Promise<any>((resolve, reject) => {
          this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
            .then(value=>{
              const dataUser = value.user;
              // if(dataUser.emailVerified)resolve(value);
              // else{
              //   this.afAuth.auth.signOut();
              //   reject(new Error('Usuario No Verificado'));
              // }
              resolve(value);

            })
            .catch(function(error) {
              reject(error);
            });
    });
  }

  loginWithFacebook(){
    return  new Promise<any>((resolve, reject) => {
        this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
          .then((credential)=>{

            this.updateUserData(credential.user)
              .then(token=>{
                resolve(credential.user.displayName);
              },err=>{
                this.afAuth.auth.signOut();
                reject(err);
              });

          })
          .catch((error)=>{
            reject(error);
          })
    });
  }

  signOut() {
    return new Promise<any>((resolve, reject) => {
      this.http.get<any>(this.API+"logout").subscribe(res=>{
        resolve(res);
      },error=>{
        reject(error.error);
      })
    });
  }

  private updateUserData(user) {
    console.log('USER FAC',user)
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      nombre: user.displayName,
      dni:null,
      email: user.email,
      roles: {
        tourist: true
      }
    }
    return new Promise<any>((resolve, reject) => {
      userRef.set(data, { merge: true }).then(res=>{
        resolve(res);
      },error=>{
        reject(error);
      })
    });

  }



  //TOKEN

  getDataUserSession(){
    var user = null;
    const token = localStorage.getItem('access_token');

    if(token && this.isAuthenticated()){
      user = decode(token);
    }
    // decode the token to get its payload
    return user;
  }
  getToken(){
    const token = localStorage.getItem('access_token');
    return token;
  }

  public isAuthenticated(): boolean {
    let jwtHelper: JwtHelperService = new JwtHelperService();
    const token = localStorage.getItem('access_token');
    if(token){
      return !jwtHelper.isTokenExpired(token);
    }
    // Check whether the token is expired and return
    // true or false
    return false;
  }

  public checkAuthorization(role:string): boolean {
    let allowedRoles = ['agency', 'tourist'];
    var user = this.getDataUserSession();

    if (!user) return false

    if ( user.roles[role] ) {
      return true
    }

    return false
  }


}
