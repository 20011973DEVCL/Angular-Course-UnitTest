import { ReduceTextPipe } from "./reduce-text.pipe";

describe('ReducerTextPipe 1', () => {
  it('create an instance', () => {
    const pipe = new ReduceTextPipe();
    expect(pipe).toBeTruthy();
  })
});

describe('ReduceTextPipe 2', () => {
  let pipe: ReduceTextPipe;

  beforeEach( () => {
    pipe = new ReduceTextPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform', ()=> {
    const text = 'Hello this is a test for check a pipe';
    const newText = pipe.transform(text, 5);
    expect(newText.length === 5).toBeTrue();
  });
});
