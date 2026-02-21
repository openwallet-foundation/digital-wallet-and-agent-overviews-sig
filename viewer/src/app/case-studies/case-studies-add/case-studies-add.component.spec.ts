import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudiesAddComponent } from './case-studies-add.component';

describe('CaseStudiesAddComponent', () => {
  let component: CaseStudiesAddComponent;
  let fixture: ComponentFixture<CaseStudiesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudiesAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseStudiesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
