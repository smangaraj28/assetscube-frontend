//https://github.com/ngxs/ngxs-examples/blob/master/timekeeper/src/app/auth/auth.state.ts
import { ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';

import { FireauthService } from '../../../accore/fireauth/fireauth.service';
import { ApiserviceService } from '../../../accore/apiservice/apiservice.service';

// import { AngularFireAuth } from '@angular/fire/auth';

//import * as firebase from 'firebase/app';

import { Action, Selector, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { take, tap } from 'rxjs/operators';

import {
  CheckSession,
  LoginSuccess,
  LogoutSuccess,
  SessionExists,
  LoginFailed
} from './auth.actions';
import { AuthStateModel, User } from '../models/auth.model';
import { DialogsService } from 'src/app/accommonmod/dialogmod/dialogs.service';
import { DeprecatedDatePipe } from '@angular/common';
import { Observable } from 'rxjs';


@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    initialized: false,
    user: null,
    token: null,
    tokenclaims: null,
    sessionid: null,
    error: null,
  }
})
export class AuthState implements NgxsOnInit {

  dialogd:any;
  


  constructor(private store: Store, private afAuthservice: FireauthService, private dialog: DialogsService, private api: ApiserviceService) {}

  /**
   * Selectors
   */
  @Selector()
  static getInitialized(state: AuthStateModel): boolean {
    return state.initialized;
  }

  @Selector()
  static getUser(state: AuthStateModel) {
    return state.user;
  }

  @Selector()
  static getSession(state: AuthStateModel) {
    return state.sessionid?state.sessionid:null;
  }

  @Selector()
  static getSiteid(state: AuthStateModel) {
    return state.siteid?state.siteid:null;
  }

  @Selector()
  static getUsertype(state: AuthStateModel) {
    return state.usertype?state.usertype:null;
  }
  
  /**
   * Dispatch CheckSession on start
   */
  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
  }

  /**
   * Commands
   */
  

  @Action(CheckSession)
  checkSession(ctx: StateContext<AuthStateModel>) {
    return this.afAuthservice.afAuth.authState.pipe(
      take(1),
      tap((user: User) => {
        if (user) {
          ctx.patchState({
            user: JSON.parse(JSON.stringify(user))
          });        
          return;
        } else {
          ctx.patchState({
            user: null
          });
          return;
        }

      })
    );
  }

  @Action(LoginSuccess)
  setUserStateOnSuccess(ctx: StateContext<AuthStateModel>, event: LoginSuccess) {
    console.log("inside loginusuccess");
    console.log((event));
    ctx.patchState({
      initialized: true,
      user:  JSON.parse(JSON.stringify(event.user)),
      token: JSON.parse(JSON.stringify(event.token)),
      tokenclaims: JSON.parse(JSON.stringify(event.tokenClaims)),
      sessionid: JSON.parse(JSON.stringify(event.sessionid)),
      error: null
    });
  }


  @Action(SessionExists)
  setUserOnsessionexist(ctx: StateContext<AuthStateModel>, event: SessionExists) {
    console.log("inside session exists");
    console.log((event));
    ctx.patchState({
      user:  JSON.parse(JSON.stringify(event.user))
    });
  }

  @Action(LogoutSuccess)
  setUserStateOnlogout(ctx: StateContext<AuthStateModel>) {
    console.log("inside logoutsuccess");
    console.log((event));
    ctx.patchState({
      initialized: false,
      user:  null,
      token: null,
      tokenclaims: null,
      sessionid: null,
      error: null
    });
  }

  @Action(LoginFailed)
  async Setstatetnull(ctx: StateContext<AuthStateModel>) {
  await ctx.dispatch(LogoutSuccess);
  }
  

}