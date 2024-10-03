import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyListEmbeddedComponent } from './dependencies-list-embedded.component';

describe('DependencyListEmbeddedComponent', () => {
  let component: DependencyListEmbeddedComponent;
  let fixture: ComponentFixture<DependencyListEmbeddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependencyListEmbeddedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DependencyListEmbeddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
