import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingHistoryDialogComponent } from './borrowing-history-dialog.component';

describe('BorrowingHistoryDialogComponent', () => {
  let component: BorrowingHistoryDialogComponent;
  let fixture: ComponentFixture<BorrowingHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowingHistoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowingHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
