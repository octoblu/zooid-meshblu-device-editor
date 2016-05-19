import _ from 'lodash';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import SchemaSelector from './';

import fakeMeshbluDevice from '../../test/fake-meshblu-device.json';

chai.use(chaiEnzyme());

describe('<SchemaSelector />', () => {
  let sut;

  describe('when schemas are not given', () => {
    beforeEach(() => {
      sut = shallow(<SchemaSelector schemas={null}/>);
    });

    it('should render nothing', () => {
      expect(sut).to.be.blank();
    });
  });

});
