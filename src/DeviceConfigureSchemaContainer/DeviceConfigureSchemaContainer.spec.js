import chai, { expect } from 'chai';
import _ from 'lodash';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';

import DeviceConfigureSchemaContainer from './DeviceConfigureSchemaContainer';
import fakeMeshbluDevice from '../../test/fake-meshblu-device.json';

chai.use(chaiEnzyme());

describe('<DeviceConfigureSchemaContainer />', () => {
  let sut;

  beforeEach(() => {
    sut = shallow(<DeviceConfigureSchemaContainer />);
  });

  it('should exist', () => {
    expect(sut).to.be.present();
  });


  describe('When given messages as prop', () => {
    beforeEach(() => {
      sut = shallow(<DeviceConfigureSchemaContainer device={fakeMeshbluDevice} onSubmit={_.noop}/>);
    });

    it('should set the selected schema to the first message', () => {
      expect(sut.state('selected')).to.deep.equal('example-message-01');
    });
  });
});
