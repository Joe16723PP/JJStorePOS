import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {DialogProdManagmentModel, ProductTypeModel} from '../../models/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {validators} from '../../validators/validators';
import {InitialDataService} from '../../initialData/initial-data.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-dialog-prod-management',
  templateUrl: './dialog-prod-management.component.html',
  styleUrls: ['./dialog-prod-management.component.css']
})
export class DialogProdManagementComponent implements OnInit {

  update_form: FormGroup;
  prod_type: ProductTypeModel[];
  isUpdate = true;
  isSubmitting: boolean = false;

  constructor(
    public _snackBar: MatSnackBar,
    private initialData: InitialDataService,
    private http: HttpClient,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogProdManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogProdManagmentModel
  ) { }

  ngOnInit() {
    this.isUpdate = this.data.option_dialog === 'update';
    this.initialData.getProductType().subscribe(data => {
      this.prod_type = data;
    });
    this.update_form = this.fb.group({
      prod_id: [this.data.prod_detail.prod_id, [Validators.pattern(validators.number), Validators.required]],
      prod_name: [this.data.prod_detail.prod_name, [Validators.pattern(validators.no_spacial), Validators.required]],
      prod_type_id: [this.data.prod_detail.prod_type_id, Validators.required],
      prod_amount: [this.data.prod_detail.prod_amount , [Validators.pattern(validators.number), Validators.required]],
      cost: [this.data.prod_detail.cost, [Validators.pattern(validators.number), Validators.required]],
      sell_price: [this.data.prod_detail.sell_price, [Validators.pattern(validators.number), Validators.required]],
      add_more: ['' , [Validators.pattern(validators.number), Validators.required]]
    });
    this.disabledInput();
  }

  private disabledInput() {
    if (this.isUpdate) {
      this.update_form.get('prod_id').disable();
      this.update_form.get('prod_name').disable();
      this.update_form.get('prod_type_id').disable();
    } else {
      this.update_form.get('add_more').disable();
    }
  }

  onSubmit() {
    this.update_form.get('prod_id').enable();
    this.update_form.get('prod_name').enable();
    this.update_form.get('prod_type_id').enable();
    let url = '';
    if (this.isUpdate === true) {
      url = environment.api_url + '/store_prod';
    } else {
      url = environment.api_url + '/edit_prod';
    }
    this.http.post(url, this.update_form.value).subscribe(() => {
      this.dialogRef.close(true);
      this.openSnackBar('อัพเดทข้อมูลเรียบร้อย', 'close');
    }, error => {
      this.openSnackBar('เกิดข้อผิดพลาด กรุณาลองใหม่', 'close');
      console.log(error);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3500,
    });
  }
}
