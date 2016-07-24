import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import { shallow } from 'enzyme'

import DeviceMessageSchemaContainer from './'
import fakeMeshbluDevice from '../../test/fake-meshblu-device.json'

chai.use(chaiEnzyme())

describe('<DeviceMessageSchemaContainer />', () => {
  let sut

  beforeEach(() => {
    sut = shallow(<DeviceMessageSchemaContainer device={fakeMeshbluDevice} />)
  })

  it('should exist', () => {
    expect(sut).to.be.present()
  })
})
