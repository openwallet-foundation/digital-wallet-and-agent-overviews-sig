import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudiesListEmbeddedComponent } from './case-studies-list-embedded.component';

describe('ListComponent', () => {
  let component: CaseStudiesListEmbeddedComponent;
  let fixture: ComponentFixture<CaseStudiesListEmbeddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudiesListEmbeddedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseStudiesListEmbeddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
