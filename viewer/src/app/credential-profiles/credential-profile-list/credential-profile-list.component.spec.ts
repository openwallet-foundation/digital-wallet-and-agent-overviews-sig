import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialProfileListComponent } from './credential-profile-list.component';

describe('CredentialProfileListComponent', () => {
  let component: CredentialProfileListComponent;
  let fixture: ComponentFixture<CredentialProfileListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CredentialProfileListComponent]
    });
    fixture = TestBed.createComponent(CredentialProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
