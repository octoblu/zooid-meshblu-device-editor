import chai, { expect } from 'chai';
import _ from 'lodash';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';

import DeviceConfigureSchemaContainer from './';
import fakeMeshbluDevice from '../../test/fake-meshblu-device.json';

chai.use(chaiEnzyme());

describe('<DeviceConfigureSchemaContainer />', () => {
  let sut;

  describe('When given device as prop', () => {
    beforeEach(() => {
      sut = shallow(<DeviceConfigureSchemaContainer device={fakeMeshbluDevice} />);
    });

    it('should be present', () => {
      expect(sut).to.be.present();
    });
  });
});
