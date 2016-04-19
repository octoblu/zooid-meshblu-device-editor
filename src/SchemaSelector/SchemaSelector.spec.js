import _ from 'lodash';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import SchemaSelector from './SchemaSelector';

chai.use(chaiEnzyme());

describe('<SchemaSelector />', () => {
  let sut;

  beforeEach(() => {
    sut = shallow(<SchemaSelector />);
  });

  it('should exist', () => {
    expect(sut).to.be.present();
  });

  describe('when given schemas', () => {
    const schemas = ['Mesa', 'Phoenix', 'Chi-Town'];

    beforeEach(() => {
      sut = shallow(<SchemaSelector schemas={schemas} />);
    });

    it('should render options with each schema name', () => {
      expect(sut.find('option').length).to.equal(schemas.length);
    });

    it('should set the text and value of each option to the schema name', () => {
      _.forEach(schemas, (title, index) => {
        expect(sut.find('select').childAt(index).props().value).to.equal(title);
        expect(sut.find('select').childAt(index).props().children).to.equal(title);
      });
    });
  });

  describe('when schemas are not given', () => {
    beforeEach(() => {
      sut = shallow(<SchemaSelector />);
    });

    it('should render nothing', () => {
      expect(sut).to.be.blank();
    });
  });

  describe('When no selectedSchema prop is passed in', () => {
    const schemas = ['intern-01', 'intern-02'];

    beforeEach(() => {
      sut = shallow(<SchemaSelector schemas={schemas} />);
    });

    it('should default to the first schema', () => {
      expect(sut.props().defaultValue).to.equal(schemas[0]);
    });
  });

  describe('When selectedSchema is passed in', () => {
    beforeEach(() => {
      const schemas = ['intern-01', 'intern-02'];
      sut = shallow(<SchemaSelector schemas={schemas} selectedSchema="bang!" />);
    });

    it('should set the defaultValue to the selectedSchema', () => {
      expect(sut.props().defaultValue).to.equal('bang!');
    });
  });

  describe('when selection changes', () => {
    const handleChange = sinon.spy();

    beforeEach(() => {
      const schemas = ['intern-01', 'intern-02'];
      sut = shallow(<SchemaSelector schemas={schemas} onChange={handleChange} />);
      sut.simulate('change');
    });

    it('should call the onChange function', () => {
      expect(handleChange.calledOnce).to.equal(true);
    });
  });
});
