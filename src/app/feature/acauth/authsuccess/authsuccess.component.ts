import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {Router} from '@angular/router';
import {Genericservice} from '../../../accore';

export interface IModule {
    name: string;
    route: string;
    display: string;
    previewImage: string;
}

@Component({
    selector: 'app-authsuccess',
    templateUrl: './authsuccess.component.html',
    styleUrls: ['./authsuccess.component.scss']
})
export class AuthsuccessComponent implements OnInit {

    @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;
    events: string[] = [];
    opened = true;
    private moduleFlag = false;
    iModules: IModule[];
    modulesPreviewPath = '/assets/images/';

    constructor(private router: Router,
                private genericService: Genericservice) {
    }

    static initializeModuleDetails() {
        return [
            {
                'name': 'Room Booking',
                'route': '/room',
                'display': 'Room Booking',
                'previewImage': 'bagel.jpg'
            },
            {
                'name': 'Inventory Management',
                'route': '/inventory',
                'display': 'Inventory Management',
                'previewImage': 'chocolate-croissant.jpg'
            },
            {
                'name': 'Entity POS',
                'route': '/pos',
                'display': 'Entity POS',
                'previewImage': 'cortado.jpg'
            },
            {
                'name': 'Super Market POS',
                'route': '/superMarket',
                'display': 'Super Market POS',
                'previewImage': 'croissant.jpg'
            },
            {
                'name': 'Reports',
                'route': '/reports',
                'display': 'Reports',
                'previewImage': 'sausage-egg.jpg'
            },
            {
                'name': 'Admin',
                'route': '/admin',
                'display': 'Admin',
                'previewImage': 'tea.jpg'
            },
            {
                'name': 'Gold',
                'route': '/gold',
                'display': 'GoldPlan',
                'previewImage': 'tea.jpg'
            }

        ];
    }

    ngOnInit() {
        console.log(this.genericService.nav_dest);
        // this.genericService.nav_dest = 'module';
        if (this.genericService.nav_dest === 'entity') {
            this.router.navigate(['/admin/admin/entity']);
        } else if (this.genericService.nav_dest === 'package') {
            this.router.navigate(['/admin/admin/payment']);
        } else if (this.genericService.nav_dest === 'branch') {
            this.router.navigate(['/admin/admin/branch']);
        } else if (this.genericService.nav_dest === 'module') {
            this.moduleFlag = true;
            this.iModules = AuthsuccessComponent.initializeModuleDetails();
        } else {
            this.moduleFlag = true;
            this.iModules = AuthsuccessComponent.initializeModuleDetails();
        }
    }


    /*constructor(private router: Router) {
    }

    ngOnInit() {
    }

    Nakanban() {
        // These routes to be defined in App module (check app-routing.module.ts)
        // These are separate modules
        this.router.navigate(['/kanban']);
    }

    NaDashboard() {
        // These routes to be defined in App module (check app-routing.module.ts)
        // These are separate modules
        this.router.navigate(['/dashboard']);

    }*/
}
