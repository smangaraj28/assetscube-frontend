import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {MatSelect} from '@angular/material';
import {DataService} from './services/data.service';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subject} from 'rxjs';
import {Modules, RoleTable} from './models/role';
import {MatSelectChange} from '@angular/material/select';
import {User} from '../user-table/models/user';
import {ActivatedRoute} from '@angular/router';
import {RoleTableDeleteDialogComponent} from './dialogs/delete/role-table-delete-dialog.component';
import {FormControl, FormGroup} from '@angular/forms';
import {DragDropDualListComponent} from '../../../../acshared/drag-drop-dual-list/drag-drop-dual-list.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-role-table',
    templateUrl: './role-table.component.html',
    styleUrls: ['./role-table.component.scss']
})
export class RoleTableComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(DragDropDualListComponent, {static: false}) private dragDropDualListComponent: DragDropDualListComponent;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild('filter', {static: true}) filter: ElementRef;
    @ViewChild('singleSelect', {static: false}) singleSelect: MatSelect;
    private onDestroySubject = new Subject<void>();
    displayedColumns = ['id', 'roleName', 'actions'];
    entityLists = ['E1', 'E2'];
    clonedModuleDetails: Modules[] = [];
    selectedModuleDetails: Modules[] = [];
    roleDataSource: RoleTable[];
    clonedRoleDataSource: RoleTable[];
    moduleDetails: Modules[];
    leftTitleDragDrop = 'Available Modules';
    rightTitleDragDrop = 'Selected Modules';
    availableModuleName = [];
    newEntryFlag = false;
    selectedEntity = 'ALL';
    selectedUserOrRole: any;
    selectedUserOrRoleName: any;
    userOrRoleNameList = [];
    selectUserOrRoleDetails = [];
    roleTableFlag = false;
    roleName: any;
    selectedModuleName = [];
    filterValue: any;
    proceedClickFlag = false;
    subCardLabel: string;
    entityName: any;
    roleId: number;
    private i = 100;
    roleForm: any;

    constructor(public dialog: MatDialog,
                public dataService: DataService,
                private cd: ChangeDetectorRef,
                private activatedRoute: ActivatedRoute) {
    }

    static initilizeModulesName() {
        return [
            'Room Book Module',
            'Inventory Module',
            'Entity POS Module',
            'Super Market POS Module',
            'Reports Module',
            'Accounting Module'];
    }

    static initilizeModuleDetails() {
        return [
            {
                moduleId: 1,
                moduleName: 'Entity POS Module',
                selected: false,
                readAllFlag: false,
                writeAllFlag: false,
                moduleDescription: [
                    {subModuleId: 1, subModuleName: 'AVX', readFlag: false, writeFlag: false},
                    {subModuleId: 2, subModuleName: 'POP', readFlag: false, writeFlag: false}
                ]
            },
            {
                moduleId: 2,
                moduleName: 'Accounting Module',
                selected: false,
                readAllFlag: false,
                writeAllFlag: false,
                moduleDescription: [
                    {subModuleId: 1, subModuleName: 'Role', readFlag: false, writeFlag: false},
                    {subModuleId: 2, subModuleName: 'Branch', readFlag: false, writeFlag: false}
                ]
            },
            {
                moduleId: 3,
                moduleName: 'Room Book Module',
                selected: false,
                readAllFlag: false,
                writeAllFlag: false,
                moduleDescription: [
                    {subModuleId: 1, subModuleName: 'Room', readFlag: false, writeFlag: false},
                    {subModuleId: 2, subModuleName: 'Rest', readFlag: false, writeFlag: false}
                ]
            },
            {
                moduleId: 4,
                moduleName: 'Super Market POS Module',
                selected: false,
                readAllFlag: false,
                writeAllFlag: false,
                moduleDescription: [
                    {subModuleId: 1, subModuleName: 'Room', readFlag: false, writeFlag: false},
                    {subModuleId: 2, subModuleName: 'Rest', readFlag: false, writeFlag: false}
                ]
            },
            {
                moduleId: 5,
                moduleName: 'Inventory Module',
                selected: false,
                readAllFlag: false,
                writeAllFlag: false,
                moduleDescription: [
                    {subModuleId: 1, subModuleName: 'Room', readFlag: false, writeFlag: false},
                    {subModuleId: 2, subModuleName: 'Rest', readFlag: false, writeFlag: false}
                ]
            },
            {
                moduleId: 6,
                moduleName: 'Reports Module',
                selected: false,
                readAllFlag: false,
                writeAllFlag: false,
                moduleDescription: [
                    {subModuleId: 1, subModuleName: 'Room', readFlag: false, writeFlag: false},
                    {subModuleId: 2, subModuleName: 'Rest', readFlag: false, writeFlag: false}
                ]
            }
        ];
    }

    ngOnInit() {
        this.roleForm = new FormGroup({
            entityNameFormControl: new FormControl(),
            roleNameFormControl: new FormControl(),
            UserOrRoleFormControl: new FormControl(),
            SelectedUserOrRoleNameFormControl: new FormControl()
        });
        const resolvedRoleData = this.activatedRoute.snapshot.data.resolvedRoleData;
        console.log('Resolved Role Data', resolvedRoleData);
        this.roleDataSource = resolvedRoleData;
        this.clonedRoleDataSource = resolvedRoleData;
        this.moduleDetails = RoleTableComponent.initilizeModuleDetails();
        this.availableModuleName = RoleTableComponent.initilizeModulesName();
        this.clonedModuleDetails = this.moduleDetails;
        this.selectUserOrRoleDetails = [
            {
                name: 'User',
                list: [
                    'Soumya', 'Abdul', 'Aaron', 'Ram'
                ]
            },
            {
                name: 'Role',
                list: [
                    'Admin', 'Store Keeper', 'Inventory Manager'
                ]
            }
        ];
        this.loadData();
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
        this.onDestroySubject.next();
        this.onDestroySubject.complete();
    }

    refresh() {
        this.loadData();
    }

    addNew() {
        if (this.selectedEntity && this.selectedEntity !== 'ALL') {
            this.entityName = this.selectedEntity;
            this.roleForm.controls.entityNameFormControl.disable();
        }
        this.proceedClickFlag = false;
        this.roleId = undefined;
        this.newEntryFlag = true;
        this.roleName = null;
        this.selectedUserOrRole = null;
        this.selectedUserOrRoleName = null;
        this.availableModuleName = RoleTableComponent.initilizeModulesName();
        this.selectedModuleName = [];
        this.moduleDetails = RoleTableComponent.initilizeModuleDetails();
        this.selectedModuleDetails = [];
        this.roleTableFlag = false;

        // this.userTableFlag = false;
        // this.proceedClickFlag = false;
        this.subCardLabel = 'Add';
        this.roleName = null;
        this.selectedUserOrRole = null;
        this.selectedUserOrRoleName = null;
    }

    arrayRemove(arr, value) {
        return arr.filter((ele) => {
            return ele !== value;
        });
    }

    startEdit(i: number, row) {
        this.entityName = row.entityName;
        this.roleForm.controls.entityNameFormControl.disable();
        this.roleTableFlag = true;
        this.proceedClickFlag = true;
        console.log(row);
        this.subCardLabel = 'Edit';
        const abc = row.roleDetails.filter(value => {
            return value.selected === true;
        });
        this.newEntryFlag = true;
        this.roleId = row.roleId;

        // this.userTableFlag = true;
        // this.proceedClickFlag = true;
        this.availableModuleName = RoleTableComponent.initilizeModulesName();
        this.selectedModuleName = [];
        // this.branchRoleTable = [];
        this.roleName = row.roleName;
        this.selectedUserOrRole = null;
        this.selectedUserOrRoleName = null;
        row.roleDetails.map(value => {
            const selectedValue = value.selected === true ? value.moduleName : '';
            if (selectedValue) {
                this.selectedModuleName.push(selectedValue);
                this.availableModuleName = this.arrayRemove(this.availableModuleName, selectedValue);
            }
        });
        this.selectedModuleDetails = row.roleDetails.filter(event => {
            return event.selected === true;
        });
        // console.log(this.selectedModuleName);
        // console.log(this.availableModuleName);
        // this.newEntryFlag = true;
    }

    deleteItem(i: number, row) {
        this.roleId = row.roleId;
        const dialogRef = this.dialog.open(RoleTableDeleteDialogComponent, {
            data: row
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                const foundIndex = this.roleDataSource.findIndex(x => x.roleId === this.roleId);
                this.roleDataSource.splice(foundIndex, 1);
                this.clonedRoleDataSource = [...this.roleDataSource];
                // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.roleId === this.id);
                // this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
                this.refreshTable();
            }
        });
    }


    private refreshTable() {
        this.paginator._changePageSize(this.paginator.pageSize);
    }


    public loadData() {
        // this.exampleDatabase = new DataService(this.httpClient);
        // this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
        // fromEvent(this.filter.nativeElement, 'keyup')
        // // .debounceTime(150)
        // // .distinctUntilChanged()
        //   .subscribe(() => {
        //     if (!this.dataSource) {
        //       return;
        //     }
        //     this.dataSource.filter = this.filter.nativeElement.value;
        //   });
    }

    onSave() {
        // // console.log(this.selectedModuleDetails);
        // // console.log(typeof this.roleId === 'undefined');
        // if (typeof this.roleId === 'undefined') {
        //   // this.entityBranchData.roleName = this.roleName;
        //   // this.dataService.addIssue(this.entityBranchData);
        //   // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // } else {
        //   // this.dataService.updateIssue(this.entityBranchData);
        //   // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.roleId === this.id);
        //   // this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        //   this.roleId = undefined;
        // }
        // this.refreshTable();
        this.newEntryFlag = false;
        this.roleForm.controls.entityNameFormControl.enable();
        let obj: RoleTable;
        switch (this.subCardLabel) {
            case 'Add':
                // console.log('add');
                obj = {
                    roleId: this.i,
                    entityName: this.entityName,
                    roleName: this.roleName,
                    roleDetails: this.selectedModuleDetails
                };
                this.roleDataSource.push(obj);
                this.clonedRoleDataSource = [...this.roleDataSource];
                this.i = this.i + 1;
                break;
            case 'Edit':
                // console.log('edit');
                obj = {
                    roleId: this.roleId,
                    entityName: this.entityName,
                    roleName: this.roleName,
                    roleDetails: this.selectedModuleDetails
                };
                const foundIndex = this.roleDataSource.findIndex(x => x.roleId === this.roleId);
                this.roleDataSource[foundIndex] = obj;
                this.clonedRoleDataSource = [...this.roleDataSource];
                break;
        }
        console.log(this.clonedRoleDataSource);
    }

    onCancel() {
        this.newEntryFlag = false;
        this.selectedModuleDetails = [];
        this.availableModuleName = [];
        this.selectedModuleName = [];
        this.entityName = null;
        this.roleForm.controls.entityNameFormControl.enable();
    }

    onFileChanged(event) {
        const file = event.target.files[0];
    }

    UserOrRoleChangeAction(education: any) {
        this.selectedUserOrRoleName = '';
        const dropDownData = this.selectUserOrRoleDetails.find((data: any) => data.name === education);
        if (dropDownData) {
            this.userOrRoleNameList = dropDownData.list;
        } else {
            this.userOrRoleNameList = [];
        }
    }

    proceed() {
        this.proceedClickFlag = true;
        // console.log(this.dragDropDualListComponent.selectedModuleName);
        this.selectedModuleDetails = [];
        this.clonedModuleDetails.forEach(event => {
            event.selected = false;
        });
        if (typeof this.dragDropDualListComponent.selectedModuleName !== 'undefined'
            && this.dragDropDualListComponent.selectedModuleName.length > 0) {
            this.dragDropDualListComponent.selectedModuleName.forEach(value => {
                this.clonedModuleDetails.forEach(value1 => {
                    if (value1.moduleName === value) {
                        value1.selected = true;
                    }
                });
            });
            this.selectedModuleDetails = this.clonedModuleDetails.filter(event => {
                return event.selected === true;
            });
            this.roleTableFlag = true;
        } else {
            this.roleTableFlag = false;
        }
        // console.log(this.selectedModuleDetails);
    }

    reset() {
        this.proceedClickFlag = false;
        this.roleTableFlag = false;
    }

    entitySelectionChange($event: MatSelectChange) {
        // console.log($event.value);
        if ($event.value !== 'ALL') {
            this.clonedRoleDataSource = this.roleDataSource.filter(value => {
                this.entityName = $event.value;
                this.roleForm.controls.entityNameFormControl.disable();
                return value.entityName === $event.value;
            });
        } else {
            this.roleForm.controls.entityNameFormControl.enable();
            this.entityName = null;
            this.clonedRoleDataSource = this.roleDataSource;
        }
    }

    filterValueChange($event: Event) {
        this.clonedRoleDataSource = this.roleDataSource.slice().filter((value: RoleTable) => {
            const searchStr = (value.roleName) ?
                (value.roleName).toLowerCase() : '';
            return searchStr.indexOf(this.filterValue.toLowerCase()) !== -1;
        });
    }
}

// export class ExampleDataSource extends DataSource<Role> {
//   filterChangeSubject = new BehaviorSubject('');
//
//   get filter(): string {
//     return this.filterChangeSubject.value;
//   }
//
//   set filter(filter: string) {
//     this.filterChangeSubject.next(filter);
//   }
//
//   filteredData: Role[] = [];
//   renderedData: Role[] = [];
//
//   constructor(public exampleDatabase: DataService,
//               public mPaginator: MatPaginator,
//               public mSort: MatSort) {
//     super();
//     // Reset to the first page when the user changes the filter.
//     this.filterChangeSubject.subscribe(() => this.mPaginator.pageIndex = 0);
//   }
//
//   /** Connect function called by the table to retrieve one stream containing the entityBranchData to render. */
//   connect(): Observable<Role[]> {
//     // Listen for any changes in the base entityBranchData, sorting, filtering, or pagination
//     const displayDataChanges = [
//       this.exampleDatabase.dataChange,
//       this.mSort.sortChange,
//       this.filterChangeSubject,
//       this.mPaginator.page
//     ];
//
//     this.exampleDatabase.getAllIssues();
//
//
//     return merge(...displayDataChanges).pipe(map(() => {
//         // Filter entityBranchData
//         this.filteredData = this.exampleDatabase.data.slice().filter((issue: Role) => {
//           const searchStr = (issue.roleName) ?
//             (issue.roleName).toLowerCase() : '';
//           return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
//         });
//
//         // Sort filtered entityBranchData
//         const sortedData = this.sortData(this.filteredData.slice());
//
//         // Grab the page's slice of the filtered sorted entityBranchData.
//         const startIndex = this.mPaginator.pageIndex * this.mPaginator.pageSize;
//         this.renderedData = sortedData.splice(startIndex, this.mPaginator.pageSize);
//         return this.renderedData;
//       }
//     ));
//   }
//
//   disconnect() {
//   }
//
//   sortData(data: Role[]): Role[] {
//     if (!this.mSort.active || this.mSort.direction === '') {
//       return data;
//     }
//
//     return data.sort((a, b) => {
//       let propertyA: number | string = '';
//       let propertyB: number | string = '';
//
//       if (this.mSort.active === 'roleName') {
//         [propertyA, propertyB] = [a.roleName, b.roleName];
//       }
//
//       const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
//       const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
//
//       return (valueA < valueB ? -1 : 1) * (this.mSort.direction === 'asc' ? 1 : -1);
//     });
//   }
// }
