import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciesFilterComponent } from './dependencies-filter.component';

describe('DependenciesFilterComponent', () => {
  let component: DependenciesFilterComponent;
  let fixture: ComponentFixture<DependenciesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependenciesFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DependenciesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
