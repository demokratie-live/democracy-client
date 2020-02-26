type JestExpect = (actual: R) => jest.Matchers<R> & jasmine.Matchers<R>;
declare const expect: JestExpect;
