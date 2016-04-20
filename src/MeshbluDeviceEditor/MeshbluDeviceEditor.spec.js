import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';

import fakeMeshbluDevice from '../../test/fake-meshblu-device.json';
import MeshbluDeviceEditor from './MeshbluDeviceEditor';

chai.use(chaiEnzyme());

describe.only('<MeshbluDeviceEditor />', () => {
  let sut;

  beforeEach(() => {
    sut = shallow(<MeshbluDeviceEditor />);
  });

  it('should exist', () => {
    expect(sut).to.be.present();
  });

  describe('when the device does not exist', () => {
    beforeEach(() => {
      sut = shallow(<MeshbluDeviceEditor />);
    });

    it('should render an error message', () => {
      expect(sut).to.be.blank();
    });
  });

  describe('when given a device that fails validation', () => {
    beforeEach(() => {
      const badDevice = { uuid: 'awesome-sauce' };
      sut = shallow(<MeshbluDeviceEditor device={badDevice} />);
    });

    it('should update the errors state', () => {
      expect(sut).state('errors').to.exist;
    });

    it('should render error list', () => {
      expect(sut.find('.errors').length).to.equal(1);
    });
  });

  describe('when given a device that passes validation', () => {
    beforeEach(() => {
      sut = mount(<MeshbluDeviceEditor device={fakeMeshbluDevice} />);
    });

    it('should set the state with a schema', () => {
      expect(sut).to.have.state('schemas');
    });
  });
});
