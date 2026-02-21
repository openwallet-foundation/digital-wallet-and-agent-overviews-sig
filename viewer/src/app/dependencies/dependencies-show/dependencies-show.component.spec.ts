import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciesShowComponent } from './dependencies-show.component';

describe('DependenciesShowComponent', () => {
  let component: DependenciesShowComponent;
  let fixture: ComponentFixture<DependenciesShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependenciesShowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DependenciesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
