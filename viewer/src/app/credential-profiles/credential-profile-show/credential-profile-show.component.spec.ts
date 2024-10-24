import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialProfileShowComponent } from './credential-profile-show.component';

describe('CredentialProfileShowComponent', () => {
  let component: CredentialProfileShowComponent;
  let fixture: ComponentFixture<CredentialProfileShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredentialProfileShowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CredentialProfileShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
