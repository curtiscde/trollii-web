import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInviteComponent } from './list-invite.component';

describe('ListInviteComponent', () => {
  let component: ListInviteComponent;
  let fixture: ComponentFixture<ListInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
