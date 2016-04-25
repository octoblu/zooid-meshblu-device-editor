import _ from 'lodash';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import MessageSchemaSelector from './MessageSchemaSelector';

import fakeMeshbluDevice from '../../test/fake-meshblu-device.json';

chai.use(chaiEnzyme());

describe('<MessageSchemaSelector />', () => {
  let sut;

  beforeEach(() => {
    sut = shallow(<MessageSchemaSelector />);
  });

  it('should exist', () => {
    expect(sut).to.be.present();
  });

  describe('when given messages', () => {
    const { messages } = fakeMeshbluDevice.schemas;

    beforeEach(() => {
      sut = shallow(<MessageSchemaSelector messages={messages} />);
    });

    it('should render options', () => {
      expect(sut.find('option').length).to.equal(messages.length);
    });

    it('should set the text and value of each option to the message title', () => {
      _.forEach(messages, (message, index) => {
        const { title } = message;

        expect(sut.find('select').childAt(index).props().value).to.equal(index);
        expect(sut.find('select').childAt(index).props().children).to.equal(title);
      });
    });
  });

  describe('when messages are not given', () => {
    beforeEach(() => {
      sut = shallow(<MessageSchemaSelector messages={null}/>);
    });

    it('should render nothing', () => {
      expect(sut).to.be.blank();
    });
  });

  describe('when messages is not an array', () => {
    beforeEach(() => {
      const messages = { foo: 'bar' };
      sut = shallow(<MessageSchemaSelector messages={messages} />);
    });

    it('should render nothing', () => {
      expect(sut).to.be.blank();
    });
  });

  describe('when selection changes', () => {
    const handleChange = sinon.spy();

    beforeEach(() => {
      const { messages } = fakeMeshbluDevice.schemas;
      const mockEvent = {
        target: {
          value: 'intern-01',
        },
      };

      sut = shallow(<MessageSchemaSelector messages={messages} onChange={handleChange} />);
      sut.simulate('change', mockEvent);
    });

    it('should call the onChange function', () => {
      expect(handleChange.called).to.equal(true);
      expect(handleChange.calledWith('intern-01')).to.equal(true);
    });
  });
});
