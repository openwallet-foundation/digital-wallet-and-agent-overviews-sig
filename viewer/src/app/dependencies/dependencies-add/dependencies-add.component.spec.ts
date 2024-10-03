import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciesAddComponent } from './dependencies-add.component';

describe('DependenciesAddComponent', () => {
  let component: DependenciesAddComponent;
  let fixture: ComponentFixture<DependenciesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependenciesAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DependenciesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
