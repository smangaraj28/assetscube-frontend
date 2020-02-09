import {Component, OnInit, Input} from '@angular/core';
// import { Menus } from './menu-element';
import {Store, Select} from '@ngxs/store';
import {User} from '../../../feature/acauth/models/auth.model';
import {AuthState} from '../../../feature/acauth/state/auth.state';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

    @Input() iconOnly = false;
    @Input() menus;
    // public menus = Menus;

    @Select(AuthState.getUser) user$: Observable<User>;
    userobservable: Subscription;
    userdetails: User;

    constructor(private store: Store) {
    }


    ngOnInit() {
        console.log(this.menus);
        console.log(this.iconOnly);
        this.userobservable = this.user$.subscribe(
            user => {
                console.log(user);
                console.log(this.userdetails);
                if (this.userdetails && user) {
                    if (this.userdetails.uid !== user.uid) {
                        // logout
                    } else {
                        // don't do anything
                    }
                }
            }
        );

        this.userdetails = this.store.selectSnapshot(AuthState.getUser);
        console.log(this.userdetails);

    }

}
