import React, { useEffect } from "react";
import { useParams } from "react-router";
import { updatePatient, useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import { Button, Grid, Icon } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients, }, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>(undefined);

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async(values: EntryFormValues) => {
        console.log('submitting entry');
        try {
            const { data: savedPatient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, values);
            dispatch(updatePatient(savedPatient));
            closeModal();
        } catch (error: unknown) {
            let errorMessage = 'Something went wrong.';
            if (error instanceof Error) {
                errorMessage += ` Error: ${error.message}`;
            }
            setError(errorMessage);
        }
    };

    let ssn: string | undefined = patients[id]?.ssn ?? undefined;
    let currentPatient = patients[id];

    const getPatientById = async (id: string) => {
        try {
            const { data: fullPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            ssn = fullPatient.ssn;
            currentPatient = fullPatient;
            dispatch(updatePatient(fullPatient));
        } catch (error: unknown) {
            let errorMessage = 'Something went wrong.';
            if (error instanceof Error) {
                errorMessage += ' Error: ' + error.message;
            }
            console.error(errorMessage);
        }
    };

    useEffect(() => {
        if (!ssn) {
            void getPatientById(id);
        }
    }, []);


    if (!currentPatient?.entries) {
        return null;
    }
    return (
        <div>
            <h1>{currentPatient.name} <Icon name={currentPatient.gender === 'female' ? "venus" : currentPatient.gender === 'male' ? 'mars' : 'other gender'} /></h1>
            <p>ssn: {currentPatient.ssn}</p>
            <p>occupation: {currentPatient.occupation}</p>
            <Grid>
                <Grid.Column floated="left" width="8" verticalAlign="middle">
                    <h3>entries</h3>
                </Grid.Column>
                <Grid.Column floated="right" width="4" verticalAlign="middle">
                    <AddEntryModal
                        modalOpen={modalOpen}
                        onClose={closeModal}
                        onSubmit={submitNewEntry}
                        error={error}
                    />
                    <Button
                        onClick={() => openModal()}
                        floated="right"
                    >Add entry</Button>
                </Grid.Column>
            </Grid>
            {currentPatient.entries.map((e: Entry) => (
                <EntryDetails key={e.id} entry={e} />
            ))}
        </div>
    );

};

export default PatientPage;