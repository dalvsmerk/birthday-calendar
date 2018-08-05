import React from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import {
    Row,
    Col,
    ProgressBar,
    Alert,
    Panel,
    Badge,
    Button,
} from 'react-bootstrap';
import Calendar from 'react-widgets/lib/Calendar';

import EditPersonModal from '../../components/BirthdayCalendar/Modals/Edit';

@observer
export default class BirthdayCalendarContainer extends React.Component {
    state = {
        deleteModalVisible: false,
        updateModalVisible: false,
        createModalVisible: false,
        calendarValue: new Date(),
    };

    componentDidMount() {
        this.props.store.fetchPersons();
    }

    _setCalendarValue = date => () => {
        this.setState({
            calendarValue: date
        }, () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        });
    };

    _handleCreate = person => {
        this.setState({
            createModalVisible: false,
        });

        this.props.store.createPerson(person);
    };

    _handleUpdate = person => {
        this.setState({
            updateModalVisible: false,
        });

        this.props.store.updatePerson(person);
    };

    _handleDelete = id => () => {
        this.props.store.deletePerson(id);
    };

    _toggleModal = (type, personToUpdate = {}) => () => {
        const stateField = [`${type}ModalVisible`];

        this.setState(state => ({
            [stateField]: !state[stateField],
            personToUpdate: type === 'update' ? personToUpdate : state.personToUpdate,
        }));
    };

    _renderPerson = person => {
        const {
            id,
            first_name,
            last_name,
            relationship,
            birthday,
        } = person;

        return (
            <Panel key={id}>
                <Panel.Heading style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {first_name} {last_name}

                    <div>
                        <Button
                            bsStyle="warning"
                            bsSize="xsmall"
                            style={{ marginRight: '10px' }}
                            onClick={this._toggleModal('update', person)}
                        >
                            Update
                        </Button>
                        <Button
                            bsStyle="danger"
                            bsSize="xsmall"
                            onClick={this._handleDelete(id)}
                        >
                            Delete
                        </Button>
                    </div>
                </Panel.Heading>
                <Panel.Body>
                    <div>
                        <p
                            style={{ cursor: 'pointer' }}
                            onClick={this._setCalendarValue(new Date(birthday))}
                        >
                            {moment(birthday).format('MMM dd, YYYY')}
                        </p>
                        <p>{relationship}</p>
                    </div>
                </Panel.Body>
            </Panel>
        )
    };

    _renderDayComponent({ date, label }) {
        const equalBirthdate = person => moment(person.birthday).dayOfYear() === moment(date).dayOfYear();
        const someonesBirthday = this.props.store.persons.findIndex(equalBirthdate) > -1;

        const style = {
            color: someonesBirthday && 'red',
            fontWeight: someonesBirthday && 'bold',
        };

        return (
            <span style={style}>
                {label}
            </span>
        );
    }

    render() {
        const { isFetching, error, persons } = this.props.store;
        const {
            updateModalVisible,
            createModalVisible,
            calendarValue,
        } = this.state;

        return (
            <Row>
                <Col xs={12}>
                    {isFetching && <ProgressBar active now={100} />}
                    {error && <Alert bsStyle="danger">{error}</Alert>}
                    <Row>
                        <Col xs={12} md={4}>
                            <Calendar
                                value={calendarValue}
                                dayComponent={this._renderDayComponent}
                            />
                        </Col>
                        <Col xs={12} md={8}>
                            <Panel>
                                <Panel.Heading>
                                    Birthdays <Badge>{persons.length}</Badge>
                                    <Button onClick={this._toggleModal('create')} bsStyle="success">
                                        <span className="glyphicon glyphicon-plus" />
                                        {' Create person'}
                                    </Button>
                                </Panel.Heading>
                            </Panel>
                            {persons.map(this._renderPerson)}
                        </Col>
                    </Row>
                </Col>
                <EditPersonModal
                    show={createModalVisible}
                    title="Create Person"
                    onCancel={this._toggleModal('create')}
                    onSubmit={this._handleCreate}
                />
                <EditPersonModal
                    show={updateModalVisible}
                    title="Update Person"
                    onCancel={this._toggleModal('update')}
                    onSubmit={this._handleUpdate}
                    person={this.state.personToUpdate}
                />
            </Row>
        );
    }
}
