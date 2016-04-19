import React, { Component, PropTypes } from 'react';
import ReactSchemaForm from 'react-jsonschema-form';


const propTypes = {
  device: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default class MeshbluDeviceEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      options: {},
      optionsSchema: { type: 'object' },
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
  }


  componentDidMount() {
    const { name, options, optionsSchema } = this.props.device;

    this.setState({
      name,
      options,
      optionsSchema,
    });
  }

  handleOptionsChange({ formData }) {
    this.props.onChange({ options: formData, name: this.state.name });
  }

  handleNameChange({ target }) {
    const name = target.value;
    this.setState({ name });
  }

  render() {
    const { error, loading, name, options, optionsSchema } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    let schemaEditor = <span></span>;
    if (optionsSchema) {
      schemaEditor = (
        <ReactSchemaForm
          schema={optionsSchema}
          formData={options}
          onSubmit={this.handleOptionsChange}
        />
      );
    }

    return (
      <div>
        <div className="MeshbluDeviceEditor-form">
          <label htmlFor="name" className="MeshbluDeviceEditor-label">Name:</label>
          <div className="MeshbluDeviceEditor-section">
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleNameChange}
              className="MeshbluDeviceEditor-name"
            />
          </div>
        </div>
        {schemaEditor}
      </div>
    );
  }
}

MeshbluDeviceEditor.propTypes = propTypes;
