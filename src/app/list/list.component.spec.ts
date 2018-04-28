import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return filtered item options based on name entered', () => {

    let itemOptions = [
      { name: 'Foo', emoji: '💩' },
      { name: 'Bar', emoji: '🥑' }
    ];

    expect(component.filterItemOptions(itemOptions, 'Fo')).toEqual(
      [
        { name: 'Foo', emoji: '💩' }
      ]
    )

  });

});
