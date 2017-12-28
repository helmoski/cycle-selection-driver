import { expect } from 'chai';
import { hello } from '../index';

import 'mocha';

describe('Hello function', () => {

  it('should return hello world', () => {
    const result = hello();
    expect(result).to.equal('Hello world!');
  });
});
