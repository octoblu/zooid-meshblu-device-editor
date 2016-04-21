import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { mount, shallow } from 'enzyme';

import ConfigureSchemaForm from './ConfigureSchemaForm';

import fakeMeshbluDevice from '../../test/fake-meshblu-device.json';

chai.use(chaiEnzyme());

describe.only('<ConfigureSchemaForm />', () => {
  let sut;

  beforeEach(() => {
    sut = shallow(<ConfigureSchemaForm />);
  });

  it('should exist', () => {
    expect(sut).to.be.present();
  });

  describe('when given a valid schema', () => {
    beforeEach(() => {
      sut = shallow(
        <ConfigureSchemaForm schema={fakeMeshbluDevice.schemas.configure} />
      );
    });

    it('should render the schema', () => {
      expect(sut.find('form').at(0)).to.exist;
    });
  });

  describe('when given no schema', () => {
    beforeEach(() => {
      sut = mount(<ConfigureSchemaForm />);
    });

    it('should set default prop', () => {
      expect(sut.prop('schema')).to.deep.equal({});
    });
  });
});
