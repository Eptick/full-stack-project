import { ImageUrlPipe } from './image-url.pipe';

describe('ImageUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new ImageUrlPipe();
    expect(pipe).toBeTruthy();
  });
  it('return a url', () => {
    const pipe = new ImageUrlPipe();
    expect(pipe.transform(3)).toContain("http");
  });
});
