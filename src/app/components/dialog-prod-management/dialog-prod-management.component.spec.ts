import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProdManagementComponent } from './dialog-prod-management.component';

describe('DialogProdManagementComponent', () => {
  let component: DialogProdManagementComponent;
  let fixture: ComponentFixture<DialogProdManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogProdManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProdManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
