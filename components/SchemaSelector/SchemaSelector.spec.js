import _ from 'lodash';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import SchemaSelector from './SchemaSelector';

chai.use(chaiEnzyme());

describe('SchemaSelector', () => {
  let sut

  beforeEach(() => {
    sut = shallow(<SchemaSelector />);
  });

  it('should exist', () => {
    expect(sut).to.exist;
  });

  describe('when given titles as prop', () => {
    const titles = ['Mesa', 'Phoenix', 'Chi-Town']

    beforeEach(() => {
      sut = shallow(<SchemaSelector titles={titles} />)
    })

    it('should render options with each title', () => {
      expect(sut.find('option').length).to.equal(titles.length)
    })

    it('should set the text and value of each option to the title', () => {
      _.forEach(titles, (title, index) => {
        expect(sut.find('select').childAt(index).props().value).to.equal(title)
        expect(sut.find('select').childAt(index).props().children).to.equal(title)
      })
    })
  })

  describe('when titles are not passed as props', () => {
    beforeEach(() => {
      sut = shallow(<SchemaSelector />)
    })

    it('should render nothing', () => {
      expect(sut.html()).to.not.exist
    })
  })

  describe('When no selectedTitle prop is passed in', () => {
    const titles = ['intern-01', 'intern-02']

    beforeEach(() => {
      sut = shallow(<SchemaSelector titles={titles} />)
    })

    it('should default to the first title', () => {
      expect(sut.props().defaultValue).to.equal(titles[0])
    })
  })

  describe('When selectedTitle is passed in', () => {
    beforeEach(() => {
      const titles = ['intern-01', 'intern-02']
      sut = shallow(<SchemaSelector titles={titles} selectedTitle="bang!" />)
    })

    it('should set the defaultValue to the selectedTitle', () => {
      expect(sut.props().defaultValue).to.equal('bang!')
    })
  })

  describe('when selection changes', () => {
    const handleChange = sinon.spy();

    beforeEach(() => {
      const titles = ['intern-01', 'intern-02']
      sut = shallow(<SchemaSelector titles={titles} onChange={handleChange} />)
      sut.simulate('change')
    })

    it('should call the onChange function', () => {
      expect(handleChange.calledOnce).to.equal(true)
    })
  })
});
