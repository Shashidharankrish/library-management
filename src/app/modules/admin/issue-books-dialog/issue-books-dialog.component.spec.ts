import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueBooksDialogComponent } from './issue-books-dialog.component';

describe('IssueBooksDialogComponent', () => {
  let component: IssueBooksDialogComponent;
  let fixture: ComponentFixture<IssueBooksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueBooksDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueBooksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
