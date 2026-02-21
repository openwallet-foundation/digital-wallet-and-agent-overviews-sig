import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudiesElementComponent } from './case-studies-element.component';

describe('CaseStudiesElementComponent', () => {
  let component: CaseStudiesElementComponent;
  let fixture: ComponentFixture<CaseStudiesElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudiesElementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseStudiesElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
