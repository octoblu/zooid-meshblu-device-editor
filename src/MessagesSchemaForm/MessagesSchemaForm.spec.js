import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';

import MessagesSchemaForm from './MessagesSchemaForm';

chai.use(chaiEnzyme());

describe.only('<MessagesSchemaForm />', () => {
  let sut;

  beforeEach(() => {
    sut = shallow(<MessagesSchemaForm />);
  });

  it('should exist', () => {
    expect(sut).to.be.present();
  });
});
