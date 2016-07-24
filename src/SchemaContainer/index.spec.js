import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import { mount, shallow } from 'enzyme'

import SchemaContainer from './'

import fakeMeshbluDevice from '../../test/fake-meshblu-device.json'

chai.use(chaiEnzyme())

describe('<SchemaContainer />', () => {
  let sut

  beforeEach(() => {
    sut = shallow(<SchemaContainer />)
  })

  it('should exist', () => {
    expect(sut).to.be.present()
  })

  describe('when given a valid schema', () => {
    beforeEach(() => {
      sut = shallow(
        <SchemaContainer schema={fakeMeshbluDevice.schemas.configure} />
      )
    })

    it('should render the schema', () => {
      expect(sut.find('form').at(0)).to.exist
    })
  })

  describe('when given no schema', () => {
    beforeEach(() => {
      sut = mount(<SchemaContainer />)
    })

    it('should set default prop', () => {
      expect(sut.prop('schema')).to.deep.equal({})
    })
  })
})
