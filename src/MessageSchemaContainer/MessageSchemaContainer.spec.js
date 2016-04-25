import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';

import MessageSchemaContainer from './MessageSchemaContainer';
import fakeMeshbluDevice from '../../test/fake-meshblu-device.json';

chai.use(chaiEnzyme());

describe('<MessageSchemaContainer />', () => {
  let sut;

  beforeEach(() => {
    sut = shallow(<MessageSchemaContainer />);
  });

  it('should exist', () => {
    expect(sut).to.be.present();
  });


  describe('When given messages as prop', () => {
    beforeEach(() => {
      const { messages } = fakeMeshbluDevice.schemas;
      sut = shallow(<MessageSchemaContainer messages={messages} />);
    });

    it('should set the selected schema to the first message', () => {
      expect(sut.state('selectedMessageSchema'))
        .to.deep.equal(fakeMeshbluDevice.schemas.messages[0]);
    });
  });
});
