import {
    observable,
    action,
} from 'mobx';

import { BASE_API_URL } from '../../api';

class BirthdayCalendarStore {
    @observable persons = [];
    @observable isFetching = true;
    @observable error = null;

    @action async fetchPersons() {
        this.isFetching = true;

        try {
            const personsResponse = await fetch(`${BASE_API_URL}/persons`);
            this.persons = await personsResponse.json();
        } catch (error) {
            this.error = error.message;
        }

        this.isFetching = false;
    }

    @action async createPerson(person) {
        this.isFetching = true;

        try {
            const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(person),
            };

            const createPersonResponse = await fetch(`${BASE_API_URL}/persons`, options);
            const createdPerson = await createPersonResponse.json();
            this.persons.push({ ...person, ...createdPerson, });
        } catch (error) {
            this.error = error.message;
        }

        this.isFetching = false;
    }

    @action async deletePerson(id) {
        this.isFetching = true;

        try {
            const options = {
                method: 'DELETE',
            };

            await fetch(`${BASE_API_URL}/persons/${id}`, options);

            const deletedPersonIndex = this.persons.findIndex(person => person.id === id);
            this.persons.splice(deletedPersonIndex, 1);
        } catch (error) {
            this.error = error.message;

        }

        this.isFetching = false;
    }

    @action async updatePerson(person) {
        this.isFetching = true;

        try {
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...person, id: undefined }),
            };

            await fetch(`${BASE_API_URL}/persons/${person.id}`, options);

            const patchedPersonIndex = this.persons.findIndex(p => p.id === person.id);
            this.persons.splice(patchedPersonIndex, 1, person);
        } catch (error) {
            this.error = error.message;
        }

        this.isFetching = false;
    }
}

export default new BirthdayCalendarStore();
