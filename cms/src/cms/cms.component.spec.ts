import { TestBed } from '@angular/core/testing';
import { CmsComponent } from './cms.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CmsComponent
      ],
    }).compileComponents();
  });

  it('should create the cms', () => {
    const fixture = TestBed.createComponent(CmsComponent);
    const cms = fixture.componentInstance;
    expect(cms).toBeTruthy();
  });

  it(`should have as title 'cms'`, () => {
    const fixture = TestBed.createComponent(CmsComponent);
    const cms = fixture.componentInstance;
    expect(cms.title).toEqual('cms');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CmsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('cms cms is running!');
  });
});
