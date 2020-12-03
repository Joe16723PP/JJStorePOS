import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditProdTypeComponent } from './dialog-edit-prod-type.component';

describe('DialogEditProdTypeComponent', () => {
  let component: DialogEditProdTypeComponent;
  let fixture: ComponentFixture<DialogEditProdTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditProdTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditProdTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
