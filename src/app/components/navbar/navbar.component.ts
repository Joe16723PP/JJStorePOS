import { Component, OnInit } from '@angular/core';
import {RouterModel} from '../../models/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  routerLink: RouterModel[] = [
    {path: '/' , displayed: 'POS'},
    {path: '/history' , displayed: 'ประวัติการขาย', params: {options: 'sell'}},
    {path: '/prod_history' , displayed: 'ประวัติซื้อสินค้า', params: {options: 'product'}},
    {path: '/add' , displayed: 'เพิ่มสินค้า/ประเภทสินค้า'},
    {path: '/management' , displayed: 'จัดการสินค้า'},
    {path: '/profit' , displayed: 'ประวัติรายรับรายจ่าย'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
