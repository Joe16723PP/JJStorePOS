import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ProductTypeModel} from '../../models/models';
import {validators} from '../../validators/validators';
import {InitialDataService} from '../../initialData/initial-data.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-dialog-edit-prod-type',
  templateUrl: './dialog-edit-prod-type.component.html',
  styleUrls: ['./dialog-edit-prod-type.component.css']
})
export class DialogEditProdTypeComponent implements OnInit {
  update_type_form: FormGroup = this.fb.group({
    prod_type_id: [''],
    type_name: ['', [Validators.required, Validators.pattern(validators.no_spacial)]]
  });
  prod_type: ProductTypeModel[];

  constructor(
    public http: HttpClient,
    public _snackBar: MatSnackBar,
    public initData: InitialDataService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogEditProdTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data.prod_type_data);
    this.initData.getProductType().subscribe((data: ProductTypeModel[]) => {
      this.prod_type = data;
    });
    this.update_type_form.get('prod_type_id').setValue(this.data.prod_type_data.prod_type_id);
    this.update_type_form.get('prod_type_id').disable();
    this.update_type_form.get('type_name').setValue(this.data.prod_type_data.type_name);
  }

  onSubmit() {
    const url = environment.api_url + '/edit_prod_type';
    this.update_type_form.get('prod_type_id').enable();
    this.http.post(url, this.update_type_form.value).subscribe(() => {
      this.openSnackBar('อัพเดทข้อมูลเรียบร้อย', 'close');
      this.dialogRef.close(true);
    }, error => {
      this.openSnackBar('เกิดข้อผิดพลาด กรุณาลองใหม่', 'close');
      console.log(error);
    });
    this.update_type_form.get('prod_type_id').disable();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3500,
    });
  }
}
