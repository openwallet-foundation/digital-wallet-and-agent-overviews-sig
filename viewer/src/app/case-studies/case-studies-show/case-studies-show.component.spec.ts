import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudiesShowComponent } from './case-studies-show.component';

describe('CaseStudiesShowComponent', () => {
  let component: CaseStudiesShowComponent;
  let fixture: ComponentFixture<CaseStudiesShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudiesShowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseStudiesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
