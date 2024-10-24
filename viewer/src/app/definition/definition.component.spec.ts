import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinitionComponent } from './definition.component';

describe('DefinitionComponent', () => {
  let component: DefinitionComponent;
  let fixture: ComponentFixture<DefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefinitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
