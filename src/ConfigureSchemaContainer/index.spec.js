import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import { shallow } from 'enzyme'

import ConfigureSchemaContainer from './'
import fakeMeshbluDevice from '../../test/fake-meshblu-device.json'

chai.use(chaiEnzyme())

describe('<ConfigureSchemaContainer />', () => {
  let sut

  describe('When given schemas as prop', () => {
    beforeEach(() => {
      sut = shallow(<ConfigureSchemaContainer schemas={fakeMeshbluDevice.schemas} />)
    })

    it('should be present', () => {
      expect(sut).to.be.present()
    })
  })
})
