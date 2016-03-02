import React, { Component, PropTypes } from 'react'
import ReactSchemaForm from 'react-jsonschema-form'

export default class MeshbluDeviceEditor extends Component {
  state = {
    device: null,
    loading: false,
    error: null,
  }

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    meshbluConfig: PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired,
      server: PropTypes.string,
      port: PropTypes.string
    })
  }

  static defaultProps = {
    meshbluConfig: {
      server: 'meshblu.octoblu.com',
      port: 443
    }
  }

  componentDidMount() {
    const { uuid, meshbluConfig } = this.props

    this.setState({ loading: true })

    this.meshbluHttp = new MeshbluHttp(meshbluConfig)
    this.meshbluHttp.whoami((error, device) => {
      if(error) {
        console.log('Error getting device', error)
        this.setState({
          error: error,
          loading: false
        })
        return
      }
      const { name, optionsSchema, options } = device
      this.setState({device,loading: false})
    })
  }

  handleSubmit = ({ formData }) => {
    const { uuid } = this.props

    this.setState({ loading: true })

    this.meshbluHttp.update(uuid, { options: formData }, (error, data) => {
      if(error) {
        console.log('Error updating device', error)
        this.setState({
          error: error,
          loading: false
        })
        return
      }
      console.log('Device updated', data)
      this.setState({ loading: false })
    })
  }

  render() {
    const { device, error, loading }    = this.state
    const { uuid, meshbluConfig } = this.props

    if (!uuid) return <div>Device UUID is required</div>

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    if (!device) return <div>Device not found</div>

    const { options, optionsSchema } = device

    return (
      <ReactSchemaForm
        schema={optionsSchema}
        formData={options}
        onSubmit={this.handleSubmit}
      />
    )
  }
}
