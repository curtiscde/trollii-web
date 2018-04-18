import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInviteAcceptEntryComponent } from './list-invite-accept-entry.component';

describe('ListInviteAcceptEntryComponent', () => {
  let component: ListInviteAcceptEntryComponent;
  let fixture: ComponentFixture<ListInviteAcceptEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInviteAcceptEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInviteAcceptEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
