import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Entity} from '../models/entity';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';

// import { environment } from '../../../../environments/environment';
// import { Entity } from '../../product';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    // private productsUrl = environment.server_url + '/products';
    dataChange: BehaviorSubject<Entity[]> = new BehaviorSubject<Entity[]>([]);
    // Temporarily stores entityData from dialogs
    dialogData: any;

    constructor(private httpClient: HttpClient) {
    }

    get data(): Entity[] {
        return this.dataChange.value;
    }

    getDialogData() {
        return this.dialogData;
    }

    getAllIssues() {
        return this.httpClient.get<Entity[]>(environment['url_' + 'admin_entity'] + '/' + 'entity');
        // this.httpClient.get<Entity[]>('/assets/entity.json').subscribe(data => {
        //     console.log('data', data);
        //     this.dataChange.next(data);
        //   },
        //   (error: HttpErrorResponse) => {
        //     console.log(error.name + ' ' + error.message);
        //   });
    }

    addIssue(issue: Entity): void {
        this.dialogData = issue;
        this.objectKeyToLowerCase(issue);
        console.log(issue);
        this.httpClient.post(environment['url_' + 'admin_entity'] + '/' + 'entity', issue)
            .subscribe(successResponse => {
                    this.onAPICallSuccess(successResponse);
                },
                errorResponse => {
                    this.onAPICallSuccess(errorResponse);
                    // Alert Error Message
                }, () => {
                }
            );
    }

    updateIssue(issue: Entity): void {
        this.dialogData = issue;
        this.objectKeyToLowerCase(issue);
        console.log(issue);
        this.httpClient.put(environment['url_' + 'admin_entity'] + '/' + 'entity', issue)
            .subscribe(successResponse => {
                    this.onAPICallSuccess(successResponse);
                },
                errorResponse => {
                    this.onAPICallSuccess(errorResponse);
                    // Alert Error Message
                }, () => {
                }
            );
    }

    deleteIssue(entityid: string): void {
        this.httpClient.delete(environment['url_' + 'admin_entity'] + '/' + 'entity', {
            params: new HttpParams().set('entityid', String(entityid))
        }).subscribe(successResponse => {
                this.onAPICallSuccess(successResponse);
            },
            errorResponse => {
                this.onAPICallSuccess(errorResponse);
                // Alert Error Message
            }, () => {
            }
        );
    }

    onAPICallSuccess(successResponse) {
        console.log(successResponse);
        // Alert Success Box For Modal
    }

    onAPICallError(errorResponse) {
        console.log(errorResponse);
        // Alert Error Box For Modal
    }

    objectKeyToLowerCase(object) {
        Object.keys(object).reduce((c, k) => (c[k.toLowerCase()] = object[k], c), {});
    }
}


/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(entityData => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(entityData => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(entityData => {
      console.log(entityData['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/
