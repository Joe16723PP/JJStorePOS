import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProdTypeComponent } from './add-prod-type.component';

describe('AddProdTypeComponent', () => {
  let component: AddProdTypeComponent;
  let fixture: ComponentFixture<AddProdTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProdTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProdTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
