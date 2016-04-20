import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';

import ConfigureSchemaForm from './ConfigureSchemaForm';

chai.use(chaiEnzyme());

describe('<ConfigureSchemaForm />', () => {
  let sut;

  beforeEach(() => {
    sut = shallow(<ConfigureSchemaForm />);
  });

  it('should exist', () => {
    expect(sut).to.be.present();
  });
});
