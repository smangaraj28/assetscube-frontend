import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {EntityBranch} from '../models/entity-branch';
import {environment} from '../../../../../../environments/environment';


// import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    // private productsUrl = environment.server_url + '/products';
    dataChange: BehaviorSubject<EntityBranch[]> = new BehaviorSubject<EntityBranch[]>([]);
    // Temporarily stores entityData from dialogs
    dialogData: any;

    constructor(private httpClient: HttpClient) {
    }

    get data(): EntityBranch[] {
        return this.dataChange.value;
    }

    getDialogData() {
        return this.dialogData;
    }

    /** CRUD METHODS */
    getAllIssues() {
        return this.httpClient.get<EntityBranch[]>(environment['url_' + 'admin_branch'] + '/' + 'entitybranch');
        // this.httpClient.get<EntityBranch[]>('/assets/entity-branch.json').subscribe(data => {
        //         console.log('data', data);
        //         this.dataChange.next(data);
        //     },
        //     (error: HttpErrorResponse) => {
        //         console.log(error.name + ' ' + error.message);
        //     });
    }

    // DEMO ONLY, you can find working methods below
    addIssue(issue: EntityBranch): void {
        this.dialogData = issue;
        this.httpClient.post(environment['url_' + 'admin_branch'] + '/' + 'entitybranch', issue)
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

    updateIssue(issue: EntityBranch): void {
        this.dialogData = issue;
        this.httpClient.put(environment['url_' + 'admin_branch'] + '/' + 'entitybranch', issue)
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

    deleteIssue(id: string, branchid: string): void {
        this.httpClient.delete(environment['url_' + 'admin_branch'] + '/' + 'entitybranch',
            {
                params: new HttpParams().set('entityid', String(id)).set('entitybranchid', String(branchid))
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
