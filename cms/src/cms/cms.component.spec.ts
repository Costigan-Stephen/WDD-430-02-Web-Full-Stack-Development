import { TestBed } from '@angular/core/testing';
import { AppComponent } from './cms.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the cms', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const cms = fixture.componentInstance;
    expect(cms).toBeTruthy();
  });

  it(`should have as title 'cms'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const cms = fixture.componentInstance;
    expect(cms.title).toEqual('cms');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('cms cms is running!');
  });
});
