import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Genericservice {

  screen_id: string;
  usertype: string = '';
  nav_dest: string;
  constructor() { }

  set_screen_id(new_screen_id: string) {
    this.screen_id = new_screen_id;
  }

  get_screen_id(): string {
    return this.screen_id;
  }

  set_user_type(new_user_type: string) {
    this.usertype = new_user_type;
  }

  get_user_type(): string {
    return this.usertype;
  }
  

  check_nav(respdata: any): void {
    console.log(respdata);
    if (respdata.entity.length === 0) {
        this.nav_dest = 'entity';
    } else if (respdata.havepackages === 'false') {
        this.nav_dest = 'package';
    } else if (respdata.entityBranch.length === 0) {
        this.nav_dest = 'branch';
    } else {
        this.nav_dest = 'module';
    }
}

}
