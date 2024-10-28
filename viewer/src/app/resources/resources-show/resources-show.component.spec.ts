import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesShowComponent } from '../resource-show/resource-show.component';

describe('ResourcesShowComponent', () => {
  let component: ResourcesShowComponent;
  let fixture: ComponentFixture<ResourcesShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourcesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
