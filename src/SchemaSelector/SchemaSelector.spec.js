import _ from 'lodash';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import SchemaSelector from './SchemaSelector';

import fakeMeshbluDevice from '../../test/fake-meshblu-device.json';

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
    const { schemas } = fakeMeshbluDevice;
    const { message } = schemas;

    beforeEach(() => {
      sut = shallow(<SchemaSelector schemas={message} />);
    });

    it('should render options', () => {
      expect(sut.find('option').length).to.equal(_.keys(message).length);
    });

    it('should set the text and value of each option to the schema title', () => {
      _.each(_.keys(message), (schemaKey, index) => {
        let { title } = message[schemaKey];
        if(title == null) {
          title = schemaKey
        }
        expect(sut.find('select').childAt(index).props().value).to.equal(schemaKey);
        expect(sut.find('select').childAt(index).props().children).to.equal(title);
      });
    });
  });

  describe('when schemas are not given', () => {
    beforeEach(() => {
      sut = shallow(<SchemaSelector schemas={null}/>);
    });

    it('should render nothing', () => {
      expect(sut).to.be.blank();
    });
  });

  describe('when selection changes', () => {
    const handleChange = sinon.spy();

    beforeEach(() => {
      const { schemas } = fakeMeshbluDevice;
      const { message } = schemas;
      const mockEvent = {
        target: {
          value: 'example-message-01',
        },
      };

      sut = shallow(<SchemaSelector schemas={message} onChange={handleChange} />);
      sut.simulate('change', mockEvent);
    });

    it('should call the onChange function', () => {
      expect(handleChange.called).to.equal(true);
    });

    it('should call onChange function with', () => {
      expect(handleChange.calledWith('example-message-01')).to.equal(true);
    });
  });
});
