import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSidebarComponent } from './user-sidebar.component';

describe('SidebarComponent', () => {
  let component: UserSidebarComponent;
  let fixture: ComponentFixture<UserSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSidebarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
