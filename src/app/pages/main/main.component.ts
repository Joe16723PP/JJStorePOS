/* tslint:disable:variable-name */
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductNoBarcodeModel, SellProductModel} from '../../models/models';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {validators} from '../../validators/validators';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {CalculatorComponent} from '../../components/calculator/calculator.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  @ViewChild('barcode', {static: false}) barcode_element: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  total_price = 0;
  current_date: string = new Date().toISOString().substring(0, 10);
  amount = 1;
  search_timeout = null;
  data_table: SellProductModel[] = [];
  data_source  = new MatTableDataSource<SellProductModel>();
  no_barcode_data_src = new MatTableDataSource<ProductNoBarcodeModel>();
  data_columns: string[] = ['prod_id', 'prod_name', 'sell_price', 'total_price' , 'action'];
  no_barcode_data_columns: string[] = ['prod_id', 'prod_name', 'sell_price', 'prod_amount'];
  prod_barcode = '';
  isCanSave = false;
  loading_no_barcode: boolean;

  constructor(public http: HttpClient,
              public _snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.no_barcode_data_src.paginator = this.paginator;
    this.doCallNoBarcodeProd();
  }

  doSearch(event: any, options: string) {
    if (options === 'from_search') {
      this.prod_barcode = event.target.value;
    } else if (options === 'from_no_barcode') {
      this.prod_barcode = event;
    }
    if (this.prod_barcode.match(validators.number) !== null && this.prod_barcode.length !== 0) {
      if (this.search_timeout) {
        clearTimeout(this.search_timeout);
      }
      this.search_timeout = setTimeout(() => {
        const id = this.prod_barcode;
        const url = environment.api_url + '/get_prod_by_id?id=' + id;
        this.http.get(url).subscribe((data: SellProductModel[]) => {
          if (data.length !== 0) {
            this.isCanSave = true;
            const tmp_prod: SellProductModel = data[0];
            tmp_prod.amount = this.amount;
            tmp_prod.total_price = tmp_prod.sell_price * tmp_prod.amount;
            this.data_table.push(tmp_prod);
            this.data_source.data = this.data_table;
            this.prod_barcode = '';
            this.amount = 1;
            this.calculateTotalPrice();
          }
        }, error => {
          this.openSnackBar('มีข้อผิดพลาด..' , 'ปิด');
          console.log(error);
        });
      }, 300);
    }
  }

  doDeleteProduct(element: SellProductModel, i: number) {
    const tmp_data_src = this.data_source.data;
    tmp_data_src.splice(i, 1);
    this.data_source.data = tmp_data_src;
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.total_price = 0;
    try {
      for (const item of this.data_source.data) {
        this.total_price += item.total_price;
      }
      if (this.data_source.data.length === 0) {
        this.isCanSave = false;
      }
    } catch (e) {
      this.total_price = 0;
      this.isCanSave = false;
    }
  }

  doSave() {
    const url = environment.api_url + '/sell_prod';
    this.http.post(url, {
      products : this.data_source.data,
      date: this.current_date,
    }).subscribe(data => {
      this.openSnackBar('กำลังอัพเดทฐานข้อมูล...' , 'ปิด');
      this.barcode_element.nativeElement.focus();
      this.isCanSave = false;
      this.total_price = 0;
      this.data_source.data = null;
      this.data_table = [];
    }, error => {
      this.openSnackBar('เกิดข้อผิดพลาด กรุณาลองใหม่' , 'ปิด');
      console.log(error);
    });
    this.doCallNoBarcodeProd();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3500,
    });
  }

  openCalculator(): void {
    const dialogRef = this.dialog.open(CalculatorComponent, {
      width: '500px',
      data: {value: this.total_price}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  doSelectNoBarcode(row: SellProductModel) {
    this.doSearch(row.prod_id, 'from_no_barcode');
  }

  private doCallNoBarcodeProd() {
    console.log('do call no b p');
    this.loading_no_barcode = true;
    this.no_barcode_data_src.data = [];
    const url = environment.api_url + '/get_prod_by_type?prod_type_id=' + 2 ;
    setTimeout(() => {
      this.http.get(url).subscribe((data: ProductNoBarcodeModel[]) => {
        this.no_barcode_data_src.data = data;
        this.loading_no_barcode = false;
      });
    }, 1500);
  }
}
