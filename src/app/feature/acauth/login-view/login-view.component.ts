import {Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {installation} from '../../../../environments/environment';
import {Genericservice} from 'src/app/accore/genericservice/genericservice.service';
import {MatTabChangeEvent} from '@angular/material/tabs';


@Component({
    selector: 'app-login-view',
    templateUrl: './login-view.component.html',
    styleUrls: ['./login-view.component.scss'],
})
export class LoginViewComponent implements AfterViewInit, OnInit {

    standaloneinstall = false;

    constructor(private genericservice: Genericservice) {
    }

    @ViewChild('tabGroup', {static: false}) tabGroup;

    ngOnInit() {
        this.genericservice.set_screen_id('aclogin');

        this.standaloneinstall = installation.standaloneinstall;
    }

    ngAfterViewInit(): void {
        if (this.tabGroup !== undefined) {
            this.tabGroup.selectedIndex = 1;
            this.toset_usertyp(this.tabGroup.selectedIndex);
        } else {
            console.log('setting up');
            this.genericservice.set_user_type('S');
        }
    }

    tabClick(ev: MatTabChangeEvent) {
        console.log(ev);
        this.toset_usertyp(ev.index);
    }

    toset_usertyp(ind: number) {
        switch (ind) {
            case(0): {
                this.genericservice.set_user_type('I');
                break;
            }
            case(1): {
                this.genericservice.set_user_type('C');
                break;
            }
        }


    }

}
