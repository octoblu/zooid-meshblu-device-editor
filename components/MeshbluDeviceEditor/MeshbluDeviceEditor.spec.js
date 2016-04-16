import _ from 'lodash';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import FakeMeshbluDevice from '../../test/fake-meshblu-device.json';
import MeshbluDeviceEditor from './MeshbluDeviceEditor';

chai.use(chaiEnzyme());

describe.only('MeshbluDeviceEditor', () => {
  let sut

  beforeEach(() => {
    sut = shallow(<MeshbluDeviceEditor />);
  });

  it('should exist', () => {
    expect(sut).to.exist
  });

  describe('when device prop is not set', () => {
    beforeEach(() => {
      sut = shallow(<MeshbluDeviceEditor /> )
    })

    it('should render nothing', () => {
      expect(sut.html()).to.not.exist
    })
  })

  describe('when device prop is set', () => {
    beforeEach(() => {
      sut = mount(<MeshbluDeviceEditor device={FakeMeshbluDevice} />)
    })

    it('should add the device to the state', () => {
      expect(sut.state('device')).to.exist
      expect(sut.state('selectedSchema')).to.exist
    })


    describe('when device schema exists', () => {
      it('should set the selectedSchema the schema', () => {
        expect(sut.find('form.rjsf')).to.exist
      })
    })
  })
})
