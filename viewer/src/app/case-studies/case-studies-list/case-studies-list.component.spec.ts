import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudiesListComponent } from './case-studies-list.component';

describe('CaseStudiesListComponent', () => {
  let component: CaseStudiesListComponent;
  let fixture: ComponentFixture<CaseStudiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudiesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseStudiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
