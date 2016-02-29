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
    token: PropTypes.string.isRequired,
    server: PropTypes.string,
    port: PropTypes.number
  }

  static defaultProps = {
    server: 'meshblu.octoblu.com',
    port: 443
  }

  componentDidMount() {
    const { uuid, token, server, port } = this.props
    const meshbluOptions = { uuid, token, server, port }

    this.setState({ loading: true })

    this.conn = meshblu.createConnection(meshbluOptions)

    this.conn.on('ready', (data) => {
      console.log('DEVICE AUTHENTICATED', meshbluOptions)

      this.conn.whoami({}, (device) => {
        console.log('DEVICE', device, this)
        const { name, optionsSchema, options } = device
        optionsSchema.title = name
        this.setState({
          device,
          loading: false
        })
      })

      this.conn.on('disconnect', function(data){
        console.log('DISCONNECTED FROM SKYNET');
      })
    })

    this.conn.on('notReady', (err, data) => {
      console.log('DEVICE AUTHENTICATION FAILED', meshbluOptions)
      this.setState({
        error: new Error(err.message),
        loading: false
      })
    })
  }

  handleSubmit = ({ formData }) => {
    this.conn.update({ options: formData }, (data) => {
      console.log('DEVICE UPDATED', data)
    })
  }

  render() {
    const { device, error, loading }    = this.state
    const { uuid, token, server, port } = this.props

    if (!uuid) return <div>Device UUID is required</div>
    if (!token) return <div>Device Token is required</div>

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
