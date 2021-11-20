import React, { useEffect } from "react";
import { useParams } from "react-router";
import { updatePatient, useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import { Icon } from "semantic-ui-react";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    
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
            { currentPatient.entries.length ? <h3>entries</h3> : ''}
            { currentPatient.entries.map((e: Entry) => (
                <div key={e.id}>
                    <p>{e.date}  {e.description}</p>
                    <ul>
                        { e.diagnosisCodes && e.diagnosisCodes.map(c => (
                            <li key={c}>{c}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );

};

export default PatientPage;