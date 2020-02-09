import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginUsrConfComponent} from './login-usr-conf/login-usr-conf.component';
import {LoginSessConfComponent} from './login-sess-conf/login-sess-conf.component';
import {LoginViewComponent} from './login-view/login-view.component';
import {AuthsuccessComponent} from './authsuccess/authsuccess.component';


const routes: Routes = [
    // { path: '', component: LoginUsrConfComponent, canActivate: [ AuthenticatedGuard ]  } ,
    {path: 'authland', component: AuthsuccessComponent /*, canActivate: [ AuthenticatedGuard ]*/},
    // { path: 'auth', component: LoginViewComponent }
    {path: '', component: LoginViewComponent},
    {path: 'auth', component: LoginUsrConfComponent},
    {path: 'sess', component: LoginSessConfComponent}

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AcauthRoutingModule {
}
