import {Component, OnInit, Input} from '@angular/core';


@Component({
    selector: 'app-side-menu-items',
    templateUrl: './side-menu-items.component.html',
    styleUrls: ['./side-menu-items.component.scss']
})
export class SideMenuItemsComponent implements OnInit {

    @Input() menu;
    @Input() iconOnly: boolean;
    @Input() secondaryMenu = false;


    constructor() {
    }

    ngOnInit() {
        console.log(this.menu);
    }

    openLink() {
        // this.menu.open = !this.menu.open;
        (!this.secondaryMenu) ? this.menu.open = !this.menu.open : this.menu.open = this.menu.open;
    }

    checkForChildMenu() {
        console.log((this.menu && this.menu.sub) ? true : false);
        return (this.menu && this.menu.sub) ? true : false;
    }

}
