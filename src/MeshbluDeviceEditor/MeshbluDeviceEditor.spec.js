import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';

import FakeMeshbluDevice from '../../test/fake-meshblu-device.json';
import MeshbluDeviceEditor from './MeshbluDeviceEditor';

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

    it('should render a "No device" message', () => {
      expect(sut).to.contain.text('No device');
    });
  });

  describe('when given a device', () => {
    beforeEach(() => {
      sut = shallow(<MeshbluDeviceEditor device={FakeMeshbluDevice} />);
    });
  });

  describe('When device has no schema property', () => {
    beforeEach(() => {
      const device = {};
      sut = shallow(<MeshbluDeviceEditor device={device} />);
    });

    it('should render a message', () => {
      expect(sut).to.contain.text('Device has no schema');
    });
  });

  describe('When device schema has no version property', () => {
    beforeEach(() => {
      const device = { schemas: {} };
      sut = shallow(<MeshbluDeviceEditor device={device} />);
    });

    it('should render a message', () => {
      expect(sut).to.contain.text('Device has no schema');
    });
  });

  describe('When device schema version is invalid', () => {
    beforeEach(() => {
      const device = {
        schemas: {
          'v777-9311': {},
        },
      };

      sut = shallow(<MeshbluDeviceEditor device={device} />);
    });

    it('should render a message', () => {
      expect(sut).to.contain.text('Schema version not supported');
    });
  });

  describe('When device schema version is valid but empty', () => {
    beforeEach(() => {
      const device = {
        schemas: {
          'v1.0.0': {},
        },
      };

      sut = shallow(<MeshbluDeviceEditor device={device} />);
    });

    it('should render a message', () => {
      expect(sut).to.contain.text('Device has no schema');
    });
  });

  describe('When the device has one or more schemas', () => {
    beforeEach(() => {
      sut = shallow(<MeshbluDeviceEditor device={FakeMeshbluDevice} />);
    });

    it('should set the schema state', () => {
      expect(sut).state('schemas').to.deep.equal(FakeMeshbluDevice.schemas['v1.0.0']);
    });
  });

  describe('When device has a valid device schema', () => {
    beforeEach(() => {
      sut = shallow(<MeshbluDeviceEditor device={FakeMeshbluDevice} />);
    });

    it('should set the selectedSchema state to the device schema', () => {
      expect(sut).state('selectedSchema').to.deep.equal(FakeMeshbluDevice.schemas['v1.0.0'].device);
    });
  });
});
