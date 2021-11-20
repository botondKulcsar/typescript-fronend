import React, { useEffect } from "react";
import { useParams } from "react-router";
import { updatePatient, useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
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


    if (!currentPatient) {
        return null;
    }
    return (
        <div>
            <h1>{currentPatient.name} <Icon name={currentPatient.gender === 'female' ? "venus" : currentPatient.gender === 'male' ? 'mars' : 'other gender'} /></h1>
            <p>ssn: {currentPatient.ssn}</p>
            <p>occupation: {currentPatient.occupation}</p>
        </div>
    );

};

export default PatientPage;