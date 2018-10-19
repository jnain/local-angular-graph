import { TestBed, async } from '@angular/core/testing';
import { BatchComponent } from './batch.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BatchComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(BatchComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'local-angular-graph'`, async(() => {
    const fixture = TestBed.createComponent(BatchComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('local-angular-graph');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(BatchComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to local-angular-graph!');
  }));
});
