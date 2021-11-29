import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesGdpComponent } from './countries-gdp.component';

describe('CountriesGdpComponent', () => {
  let component: CountriesGdpComponent;
  let fixture: ComponentFixture<CountriesGdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesGdpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesGdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
