import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ProductModel, ProductTypeModel} from '../../models/models';
import {validators} from '../../validators/validators';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {FormBuilder} from '@angular/forms';
import {InitialDataService} from '../../initialData/initial-data.service';
import {DialogProdManagementComponent} from '../../components/dialog-prod-management/dialog-prod-management.component';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  search_timeout: any;
  search_barcode: string;
  isFound: boolean = false;
  isUpdate: boolean = null;
  prod_detail: ProductModel;
  data_source = new MatTableDataSource<ProductModel>();
  data_columns: string[] = ['prod_id', 'prod_name', 'prod_type_id', 'prod_type_name', 'prod_amount' , 'sell_price', 'cost', 'upd_date'];
  prod_type_list: ProductTypeModel[];

  constructor(private http: HttpClient,
              private _snackBar: MatSnackBar,
              private initialData: InitialDataService,
              private fb: FormBuilder,
              public dialog: MatDialog,
              public spinnerDialog: MatDialog) { }

  ngOnInit() {

    this.search_barcode = '';
    this.data_source.paginator = this.paginator;
    this.initialData.getProductType().subscribe((data: ProductTypeModel[]) => {
      this.prod_type_list = data;
    });
    this.initialData.getAllProduct().subscribe((data: ProductModel[]) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data.length; i++) {
        data[i].prod_type_name = this.prod_type_list[data[i].prod_type_id].type_name;
      }
      this.data_source.data = data;
    });
  }

  doCheckDuplicateBarcode(event: any) {
    const param = event.target.value;
    const url = environment.api_url + '/check_duplicate_id?id=' + param;
    if (param.match(validators.number) !== null && param.length !== 0) {
      if (this.search_timeout) {
        clearTimeout(this.search_timeout);
      }
      this.search_timeout = setTimeout(() => {
        this.http.get(url).subscribe((data: ProductModel[]) => {
          if (data.length !== 0) {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < data.length; i++) {
              data[i].prod_type_name = this.prod_type_list[data[i].prod_type_id].type_name;
            }
            this.prod_detail = data[0];
            this.data_source.data = data;
            this.isFound = true;
            this.openSnackBar('กรุณาเลือกวิธีการจัดการ', 'close');
          } else {
            this.isFound = false;
            this.openSnackBar('ไม่พบสินค้านี้ในระบบ', 'close');
          }
        }, error => {
          console.log(error);
        });
      }, 1000);
    } else {
      if (param.length !== 0) {
        this.isFound = false;
        this.isUpdate = null;
        this.openSnackBar('ข้อมูลไม่ถูกต้อง', 'close');
      } else {
        this.isFound = false;
        this.isUpdate = null;
        this.ngOnInit();
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3500,
    });
  }

  openDialog(option: string) {
    const dialogRef = this.dialog.open(DialogProdManagementComponent, {
      width: '800px',
      data: { prod_detail: this.prod_detail, option_dialog: option},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      this.ngOnInit();
    });
  }
}
