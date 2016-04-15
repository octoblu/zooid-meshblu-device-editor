import _ from 'lodash';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import MeshbluDeviceEditor from './MeshbluDeviceEditor';

chai.use(chaiEnzyme());

describe('MeshbluDeviceEditor', () => {
  let sut

  beforeEach(() => {
    sut = shallow(<MeshbluDeviceEditor />);
  });

  it('should exist', () => {
    expect(sut).to.exist;
  });
})
