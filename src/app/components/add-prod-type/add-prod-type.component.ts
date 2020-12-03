/* tslint:disable:variable-name no-trailing-whitespace no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {InitialDataService} from '../../initialData/initial-data.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {environment} from '../../../environments/environment';
import {ProductTypeModel, SmallDetailProductModel} from '../../models/models';
import {validators} from '../../validators/validators';
import {DialogProdManagementComponent} from '../dialog-prod-management/dialog-prod-management.component';
import {DialogEditProdTypeComponent} from '../dialog-edit-prod-type/dialog-edit-prod-type.component';

@Component({
  selector: 'app-add-prod-type',
  templateUrl: './add-prod-type.component.html',
  styleUrls: ['./add-prod-type.component.css']
})
export class AddProdTypeComponent implements OnInit {

  prod_type_list: ProductTypeModel[] = [];
  add_prod_type_form: FormGroup = this.fb.group({
    type_name: ['' , [Validators.required , Validators.pattern(validators.no_spacial)]],
    upd_date: ['', [Validators.required]]
  });
  private search_timeout: any;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private initData: InitialDataService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.add_prod_type_form.get('upd_date').setValue( new Date().toISOString().substring(0, 10));
    this.initData.getProductType().subscribe((data: ProductTypeModel[]) => {
      this.prod_type_list = data;
    });
  }

  doCheckDuplicateTypeName(event: any) {
    const param = event.target.value;
    const url = environment.api_url + '/check_duplicate_prod_type_name?type_name=' + param;
    if (this.add_prod_type_form.get('type_name').valid && event.target.value.length !== 0) {
      if (this.search_timeout) {
        clearTimeout(this.search_timeout);
      }
      this.search_timeout = setTimeout(() => {
        this.http.get(url).subscribe((data: ProductTypeModel[]) => {
          if (data.length !== 0) {
            console.log(data);
            this.openSnackBar('มีประเภทสินค้านี้ในระบบแล้ว', 'close');
            this.add_prod_type_form.get('type_name').setErrors({incorrect: true});
          }
        }, error => {
          console.log(error);
        });
      }, 100);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3500,
    });
  }

  onSubmit() {
    this.isSubmitting = true;
    const url = environment.api_url + '/add_new_prod_type';
    this.http.post(url, this.add_prod_type_form.value).subscribe(() => {
      this.openSnackBar('เพิ่มสินค้าสำเร็จ', 'close');
      this.add_prod_type_form.reset();
    }, (error) => {
      this.openSnackBar('มีข้อผิดพลาดเกิดขึ้น', 'close');
      console.log(error);
    });
    this.isSubmitting = false;
    // this.ngOnInit();
    window.location.reload();
  }

  editProd(prod: ProductTypeModel) {
    const dialogRef = this.dialog.open(DialogEditProdTypeComponent, {
      width: '800px',
      data: {prod_type_data: prod},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      this.ngOnInit();
    });
  }
}
