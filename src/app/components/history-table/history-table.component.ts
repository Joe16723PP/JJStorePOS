/* tslint:disable:variable-name no-trailing-whitespace no-inferrable-types */
import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {ProductLogModel, SellLogModel} from '../../models/models';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';
import {PdfService} from '../../services/pdf.service';
import {CsvService} from '../../services/csv.service';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.css']
})
export class HistoryTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Input() option: string;
  max_all: number = 20;
  data_source = new MatTableDataSource<any>();
  data_columns: string[] = [];
  displayed_column: string[] = [];
  total_price = 0;
  date_form: FormGroup = this.fb.group({
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
  });
  isLoading = false;
  total_title: string;
  isSellLog: boolean;
  export_file_name: string;

  constructor(private http: HttpClient,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private exportAsService: ExportAsService,
              private csvService: CsvService,
              private pdfService: PdfService) {
  }

  ngOnInit() {
    if (this.option === 'sell') {
      this.export_file_name = 'sell_log_';
      this.total_title = 'จำนวนเงินทั้งหมดที่ขายสินค้า';
      this.data_columns = ['prod_id', 'prod_name', 'amount', 'sell_price', 'total_price', 'sell_datetime'];
      this.displayed_column = ['รหัสสินค้า', 'ชื่อสินค้า', 'จำนวน', 'ราคาสินค้า', 'รวมราคาสินค้า', 'วันที่ขายสินค้า'];
      this.isSellLog = true;
    } else if (this.option === 'product') {
      this.export_file_name = 'buy_log_';
      this.total_title = 'จำนวนเงินทั้งหมดที่ซื้อสินค้า';
      this.data_columns = ['prod_id', 'prod_name', 'amount', 'cost', 'total_price', 'store_date'];
      this.displayed_column = ['รหัสสินค้า', 'ชื่อสินค้า', 'จำนวน', 'ราคาต้นทุน', 'รวมราคาสินค้า', 'วันที่ลงสินค้า'];
      this.isSellLog = false;
    }

    window.addEventListener('scroll', this.scrollEvent, true);
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  scrollEvent = (event: any): void => {
    const number = event.srcElement.scrollTop;
    // console.log(number);
  }


  private calculateTotalPrice() {
    this.total_price = 0;
    // @ts-ignore
    for (const prod of this.data_source.data) {
      this.total_price += prod.total_price;
    }
  }

  doCallData() {
    let url = '';
    if (this.isSellLog === true) {
      url = environment.api_url + '/get_sell_log';
      this.data_source = new MatTableDataSource<SellLogModel>();
    } else if (this.isSellLog === false) {
      this.data_source = new MatTableDataSource<ProductLogModel>();
      url = environment.api_url + '/get_store_log';
    }
    // data: any for 2 model
    this.http.post(url, this.date_form.value).subscribe((data: any[]) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data.length; i++) {
        if (this.isSellLog === true) {
          const tmp_date = new Date(data[i].sell_datetime);
          data[i].sell_datetime = new Date(tmp_date.setDate(tmp_date.getDate() + 1)).toISOString();
        } else if (this.isSellLog === false) {
          const tmp_date = new Date(data[i].store_date);
          data[i].store_date = new Date(tmp_date.setDate(tmp_date.getDate() + 1)).toISOString();
        }
      }
      this.data_source.data = data;
      this.data_source.paginator = this.paginator;
      this.calculateTotalPrice();
      if (data.length === 0) {
        this.openSnackBar('ไม่พบข้อมูลของวันที่ดังกล่าว', 'close');
      } else {
        this.openSnackBar('โหลดข้อมูลเสร็จสิ้น', 'close');
        // console.log(data);
      }
    }, error => {
      console.log(error);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3500,
    });
  }

  doDownloadTable(option: string) {
    this.export_file_name += this.date_form.get('start_date').value + 'to' + this.date_form.get('end_date').value;
    if (option === 'pdf') {
      this.pdfService.exportAsPdfFile(this.data_source.data, this.export_file_name, 'download');
    } else if (option === 'csv') {
      this.csvService.exportAsCsvFile(this.data_source.data, this.export_file_name);
    }
  }

  getPageSizeOptions(): number[] {
    try {
      if (this.data_source.paginator.length > this.max_all) {
        return [5, 10, this.data_source.paginator.length];
      } else {
        return [5, 10, this.max_all];
      }
    } catch (e) {
      return [5, 10, this.max_all];
    }
  }
}

