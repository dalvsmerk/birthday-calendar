import React from 'react';
import moment from 'moment';
import {
    Panel,
    Button,
} from 'react-bootstrap';

export default class Person extends React.Component {
    state = {
        deleteModalVisible: false,
        updateModalVisible: false,
    };

    _handleDelete = () => {
        this.setState({
            deleteModalVisible: false,
        }, () => {
            this.props.onDelete(this.props.person.id);
        });
    };

    _toggleModal = type => () => {
        const stateField = [`${type}ModalVisible`];

        this.setState(state => ({
            [stateField]: !state[stateField],
        }));
    }

    render() {
        const {
            id,
            first_name,
            last_name,
            relationship,
            birthday,
        } = props.person;

        return (
            <Panel key={id}>
                <Panel.Heading style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <p>{first_name} {last_name}</p>
                        <p>{moment(birthday).format('MMM dd, YYYY')}</p>
                    </div>

                    <div>
                        <Button
                            bsStyle="warning"
                            bsSize="xsmall"
                            style={{ marginRight: '10px' }}
                            onClick={this._toggleModal('update')}
                        >
                            Update
                        </Button>
                        <Button
                            bsStyle="danger"
                            bsSize="xsmall"
                            onClick={this._toggleModal('delete')}
                        >
                            Delete
                        </Button>
                    </div>
                </Panel.Heading>
                <Panel.Body>{relationship}</Panel.Body>
            </Panel>
        )
    }
}