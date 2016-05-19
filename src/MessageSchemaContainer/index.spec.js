import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';

import MessageSchemaContainer from './';
import fakeMeshbluDevice from '../../test/fake-meshblu-device.json';

chai.use(chaiEnzyme());

describe('<MessageSchemaContainer />', () => {
  let sut;

  describe('When given schemas as prop', () => {
    beforeEach(() => {
      sut = shallow(<MessageSchemaContainer schemas={fakeMeshbluDevice.schemas} />);
    });

    it('should set the selected schema to the first message', () => {
      expect(sut.state('selected')).to.deep.equal('example-message-01');
    });
  });
});
