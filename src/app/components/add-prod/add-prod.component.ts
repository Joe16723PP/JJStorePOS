/* tslint:disable:variable-name no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import {ProductTypeModel, SmallDetailProductModel} from '../../models/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validators} from '../../validators/validators';
import {HttpClient} from '@angular/common/http';
import {InitialDataService} from '../../initialData/initial-data.service';
import {MatSnackBar} from '@angular/material';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent implements OnInit {

  prod_type: ProductTypeModel[] = [];
  uploadedFile: any;
  add_product_form: FormGroup = this.fb.group({
    prod_id: ['', [Validators.pattern(validators.number), Validators.required]],
    prod_name: ['', [Validators.pattern(validators.no_spacial), Validators.required]],
    prod_type_id: [1, Validators.required],
    prod_amount: ['' , [Validators.pattern(validators.number), Validators.required]],
    cost: ['', [Validators.pattern(validators.number), Validators.required]],
    sell_price: ['', [Validators.pattern(validators.number), Validators.required]],
    upd_date: [''],
    img: ['']
  });
  isUploading: boolean = false;
  private search_timeout: number;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private initData: InitialDataService,
              private _snackBar: MatSnackBar
  ) { }


  ngOnInit() {
    this.add_product_form.get('upd_date').setValue( new Date().toISOString().substring(0, 10));
    this.initData.getProductType().subscribe((data: ProductTypeModel[]) => {
      this.prod_type = data;
    });
  }

  doClickUpload() {
    const element: HTMLElement = document.getElementById('upload_photo') as HTMLElement;
    element.click();
  }

  onFileChange(event: any) {
    this.isUploading = true;
    const file = event.target.files;
    this.uploadedFile = file[0].name;
    this.add_product_form.get('img').setValue(file);
    this.isUploading = false;
  }

  onSubmit() {
    this.isSubmitting = true;
    // console.log(this.add_product_form.value);
    const url = environment.api_url + '/add_new_product';
    this.http.post(url, this.add_product_form.value).subscribe(() => {
      this.openSnackBar('เพิ่มสินค้าสำเร็จ', 'close');
      this.add_product_form.reset();
    }, (error) => {
      this.openSnackBar('มีข้อผิดพลาดเกิดขึ้น', 'close');
      console.log(error);
    });
    this.isSubmitting = false;
    this.ngOnInit();
  }

  doCheckDuplicateBarcode(event: any) {
    const param = event.target.value;
    const url = environment.api_url + '/check_duplicate_id?id=' + param;
    if (this.add_product_form.get('prod_id').valid && event.target.value.length !== 0) {
      if (this.search_timeout) {
        clearTimeout(this.search_timeout);
      }
      this.search_timeout = setTimeout(() => {
        this.http.get(url).subscribe((data: SmallDetailProductModel[]) => {
          if (data.length !== 0) {
            this.openSnackBar('มีสินค้านี้ในระบบแล้ว', 'close');
            this.add_product_form.get('prod_id').setErrors({incorrect: true});
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
}
