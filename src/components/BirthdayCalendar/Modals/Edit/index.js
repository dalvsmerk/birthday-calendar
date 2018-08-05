import React from 'react';
import {
    Modal,
    Button,
    FormGroup,
    FormControl,
    ControlLabel,
} from 'react-bootstrap';
import Combobox from 'react-widgets/lib/Combobox';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

const relationships = [
  'friend',
  'family',
  'acquaintance',
];

const defaultPerson = {
    first_name: '',
    last_name: '',
    relationship: relationships[0],
    birthday: new Date(),
};

export default class EditPersonModal extends React.Component {
    static defaultProps = {
      person: defaultPerson,
    };

    constructor(props) {
        super(props);

        this.state = props.person;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.person.id !== this.props.person.id) {
            this.setState({
                ...this.props.person,
            });
        }
    }

    _handleInputChange = field => event => {
        this.setState({
            [field]: event.target.value,
        });
    };

    _handlePickerChange = field => value => {
        this.setState({
            [field]: value,
        });
    };

    _handleSubmit = () => {
        this.props.onSubmit(this.state);
    }

    render() {
        const {
            title,
            onCancel,
            onSubmit,
            ...rest,
        } = this.props;
        const {
            first_name,
            last_name,
            relationship,
            birthday,
        } = this.state;

        return (
            <Modal {...rest}>
                <Modal.Header>{title}</Modal.Header>
                <Modal.Body>
                    <FieldGroup
                        id="first_name"
                        type="text"
                        label="First Name"
                        placeholder="Enter first name"
                        defaultValue={first_name}
                        onChange={this._handleInputChange('first_name')}
                    />
                    <FieldGroup
                        id="last_name"
                        type="text"
                        label="Last Name"
                        placeholder="Enter last name"
                        defaultValue={last_name}
                        onChange={this._handleInputChange('last_name')}
                    />
                    <FormGroup>
                        <ControlLabel>Relationship</ControlLabel>
                        <Combobox
                            data={relationships}
                            value={relationship}
                            defaultValue={relationship}
                            onChange={this._handlePickerChange('relationship')}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Birthday</ControlLabel>
                        <DateTimePicker
                            time={false}
                            defaultValue={new Date(birthday)}
                            onChange={this._handlePickerChange('birthday')}
                        />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={this._handleSubmit} bsStyle="success">Submit</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

function FieldGroup({ id, label, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
        </FormGroup>
    );
}
