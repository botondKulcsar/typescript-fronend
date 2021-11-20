import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { Entry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from "../types";

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{entry.date} <Icon size='big' name='hospital' /></Card.Header>
                <Card.Meta>{entry.description}</Card.Meta>
            </Card.Content>
        </Card>
    );
};
const OccupationalHealthcareEntryDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{entry.date} <Icon size='big' name='stethoscope' /> {entry.employerName}</Card.Header>
                <Card.Meta>{entry.description}</Card.Meta>
            </Card.Content>
        </Card>
    );
};
const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{entry.date} <Icon size='big' name='user md' /></Card.Header>
                <Card.Meta>{entry.description}</Card.Meta>
                <Card.Description ><Icon 
                    style={{
                        'color': entry.healthCheckRating === 0
                            ? 'green'
                            : entry.healthCheckRating === 1
                                ? 'yellow'
                                : entry.healthCheckRating === 2
                                    ? 'orange'
                                    : 'red'
                    }} name='heart' /></Card.Description>
            </Card.Content>
        </Card>
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

    const assertNever = (value: never): never => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    };


    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntryDetails entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareEntryDetails entry={entry} />;
        case 'HealthCheck':
            return <HealthCheckEntryDetails entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;