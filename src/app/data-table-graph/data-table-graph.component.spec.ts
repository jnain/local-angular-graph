import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableGraphComponent } from './data-table-graph.component';

describe('DataTableGraphComponent', () => {
  let component: DataTableGraphComponent;
  let fixture: ComponentFixture<DataTableGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
