import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciesListComponent } from './dependencies-list.component';

describe('DependenciesListComponent', () => {
  let component: DependenciesListComponent;
  let fixture: ComponentFixture<DependenciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependenciesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DependenciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
