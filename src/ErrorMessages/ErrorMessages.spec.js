import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';

import ErrorMessages from './ErrorMessages';

chai.use(chaiEnzyme());

describe.only('<ErrorMessages />', () => {
  let sut;

  beforeEach(() => {
    sut = shallow(<ErrorMessages />);
  });

  it('should exist', () => {
    expect(sut).to.be.present();
  });

  describe('when errors prop is undefined or empty', () => {
    beforeEach(() => {
      sut = shallow(<ErrorMessages />);
    });

    it('should render nothing', () => {
      expect(sut).to.be.blank();
    });
  });

  describe('when given errors as prop', () => {
    const errors = [
      new Error('Foo Error'),
      new Error('Bar Error'),
    ];

    beforeEach(() => {
      sut = shallow(<ErrorMessages errors={errors} />);
    });

    it('should render error messages', () => {
      expect(sut).to.not.be.blank();
    });

    it('should contain same number of error messages', () => {
      expect(sut.children().length).to.equal(2);
    });

    it('should contain each error message', () => {
      expect(sut).to.contain.text('Foo Error');
      expect(sut).to.contain.text('Bar Error');
    });
  });
});
