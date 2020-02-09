import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxsModule} from '@ngxs/store';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';

import {AuthState} from './state/auth.state';
import {LoginViewComponent} from './login-view/login-view.component';

import {AcauthRoutingModule} from './acauth-routing.module';
import {AlertmodModule} from '../../accommonmod/alertmod/alertmod.module';

import {AcsharedModule} from '../../acshared';
import {LoginUsrConfComponent} from './login-usr-conf/login-usr-conf.component';
import {AuthsuccessComponent} from './authsuccess/authsuccess.component';
import {SignupComponent} from './signup/signup.component';
import {LoginSessConfComponent} from './login-sess-conf/login-sess-conf.component';
import {LoginViewDetailComponent} from './login-view/login-view-detail/login-view-detail.component';


@NgModule({
    imports: [
        CommonModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        AcauthRoutingModule,
        AlertmodModule,
        // MaterialModule,
        NgxsModule.forFeature([
            AuthState,
        ]),
        AcsharedModule
    ],
    declarations: [
        LoginViewComponent,
        LoginUsrConfComponent,
        AuthsuccessComponent,
        SignupComponent,
        LoginSessConfComponent,
        LoginViewDetailComponent,
    ],
    providers: []
})
export class AuthModule {
}
