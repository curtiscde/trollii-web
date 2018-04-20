import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInviteAcceptComponent } from './list-invite-accept.component';

describe('ListInviteAcceptComponent', () => {
  let component: ListInviteAcceptComponent;
  let fixture: ComponentFixture<ListInviteAcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInviteAcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInviteAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
