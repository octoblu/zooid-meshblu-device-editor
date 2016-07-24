import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import { shallow } from 'enzyme'

import SchemaSelector from './'

chai.use(chaiEnzyme())

describe('<SchemaSelector />', () => {
  let sut

  describe('when schemas are not given', () => {
    beforeEach(() => {
      sut = shallow(<SchemaSelector schemas={null} />)
    })

    it('should render nothing', () => {
      expect(sut).to.be.blank()
    })
  })
})
