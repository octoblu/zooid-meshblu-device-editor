import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow, mount } from 'enzyme';

import fakeMeshbluDevice from '../test/fake-meshblu-device.json';
import MeshbluDeviceEditor from './index';

chai.use(chaiEnzyme());

describe('<MeshbluDeviceEditor />', () => {
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
      expect(sut.find('.errors')).to.have.text('No device provided');
    });
  });

  describe('when given a device that fails schema validation', () => {
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

  describe('when given a device that passes schema validation', () => {
    beforeEach(() => {
      sut = mount(<MeshbluDeviceEditor device={fakeMeshbluDevice} />);
    });

    it('should set the schema property on the state', () => {
      expect(sut.state('schemas')).to.exist;
      expect(sut.state('schemas')).to.deep.equal(fakeMeshbluDevice.schemas);
    });

    it('should set selectedSchema on the state to the configure schema', () => {
      const { configure } = fakeMeshbluDevice.schemas;

      expect(sut.state('selectedSchema')).to.exist;
      expect(sut.state('selectedSchema')).to.deep.equal(configure);
    });

    it('should render selectedSchema', () => {
      expect(sut.find('.MeshbluDeviceEditor-schemaForm')).to.not.be.blank();
    });
  });
});
