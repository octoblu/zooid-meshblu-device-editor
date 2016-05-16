import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';

import ConfigureSchemaContainer from './ConfigureSchemaContainer';
import fakeMeshbluDevice from '../../test/fake-meshblu-device.json';

chai.use(chaiEnzyme());

describe('<ConfigureSchemaContainer />', () => {
  let sut;

  beforeEach(() => {
    sut = shallow(<ConfigureSchemaContainer />);
  });

  it('should exist', () => {
    expect(sut).to.be.present();
  });


  describe('When given messages as prop', () => {
    beforeEach(() => {
      sut = shallow(<ConfigureSchemaContainer schemas={fakeMeshbluDevice.schemas} />);
    });

    it('should set the selected schema to the first message', () => {
      expect(sut.state('selected')).to.deep.equal('example-message-01');
    });
  });
});
