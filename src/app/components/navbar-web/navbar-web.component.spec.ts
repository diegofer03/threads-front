import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarWebComponent } from './navbar-web.component';

describe('NavbarWebComponent', () => {
  let component: NavbarWebComponent;
  let fixture: ComponentFixture<NavbarWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavbarWebComponent]
    });
    fixture = TestBed.createComponent(NavbarWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
