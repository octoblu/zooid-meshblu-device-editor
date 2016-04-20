import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
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

  describe('when schemas props is empty', () => {
    it('should render blank', () => {
      expect(sut).to.be.blank();
    });
  });

  describe('when schemas has a configure schema property', () => {
    beforeEach(() => {
      sut = shallow(<SchemaSelector schemas={fakeMeshbluDevice.schemas} />);
    });

    it('should render the configure button', () => {
      expect(sut).to.contain.text('Configuration');
    });
  });

  describe('when schemas has a messages schema', () => {
    beforeEach(() => {
      sut = shallow(<SchemaSelector schemas={fakeMeshbluDevice.schemas} />);
    });

    it('should render the messages button', () => {
      expect(sut).to.contain.text('Messages');
    });
  });
});
