import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-golddash',
  templateUrl: './golddash.component.html',
  styleUrls: ['./golddash.component.scss']
})
export class GolddashComponent implements OnInit {

  menus = [
    {
        'name': 'Summary',
        'link': '/gold/summary',
        'icon': 'dashboard',
        'chip': false,
        'open': true,
    },
    /*
    {
        'name': 'Branch',
        'link': '/admin/branch',
        'icon': 'B',
        'chip': false,
        'open': true,
    },
    {
        'name': 'Roles',
        'link': '/admin/role',
        'icon': 'R',
        'chip': false,
        'open': true,
    },
    {
        'name': 'Users',
        'link': '/admin/user',
        'icon': 'U',
        'chip': false,
        'open': true,
    },
    {
        'name': 'Billing',
        'icon': 'Billing',
        'link': false,
        'open': false,
        'chip': {'value': 17, 'color': 'accent'},
        'sub': [
            {
                'name': 'Package',
                'link': '/admin/payment',
                'icon': 'P',
                'chip': false,
                'open': false,
            }
        ]
    }*/
];

sidenavRequired = true;
sidebarRequired = true;

ngOnInit() {
    console.log("admin");
    console.log(this.menus);
}
}

