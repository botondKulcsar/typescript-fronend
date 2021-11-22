import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Entry, HealthCheckRating } from "../types";
import { EntryTypeOption, HealthCheckRatingType, SelectEntryTypeField, SelectHealthCheckField } from "./FormField";
import { EntryType } from "../types";

export type EntryFormValues = Omit<Entry, 'id'>;


interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}


const typeOptions: EntryTypeOption[] = [
    { value: EntryType.HealthCheck, label: 'HealthCheck' },
    { value: EntryType.Hospital, label: 'Hospital' },
    { value: EntryType.OccupationalHealthcare, label: 'OccupationalHealthcare' }
];

const healthOptions: HealthCheckRatingType[] = [
    { value: HealthCheckRating.Healthy, label: 'Healthy' },
    { value: HealthCheckRating.LowRisk, label: 'LowRisk' },
    { value: HealthCheckRating.HighRisk, label: 'HighRisk' },
    { value: HealthCheckRating.CriticalRisk, label: 'CriticalRisk' }
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnosis }] = useStateValue();

    const [initialValues, setInitialValues] = useState({
        type: EntryType.HealthCheck,
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        discharge: {
            date: '',
            criteria: ''
        },
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: '',
        sickLeave: {
            startDate: '',
            endDate: ''
        }
    });

    const isDate = (date: string): boolean => {
        return Boolean(Date.parse(date));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTypeSelect = (event: any) => {

        switch (event.target.value) {
            case EntryType.Hospital: {
                setInitialValues({ ...initialValues, type: EntryType.Hospital });
                break;
            }
            case EntryType.HealthCheck: {
                setInitialValues({ ...initialValues, type: EntryType.HealthCheck });
                break;
            }
            case EntryType.OccupationalHealthcare: {
                setInitialValues({ ...initialValues, type: EntryType.OccupationalHealthcare });
                break;
            }
            default:
                return;
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleHealthCheckRatingSelect = (event: any) => {
        

        switch (Number(event.target.value)) {
            case HealthCheckRating.Healthy: {
                setInitialValues({ ...initialValues, healthCheckRating: HealthCheckRating.Healthy});
                break;
            }
            case HealthCheckRating.LowRisk: {
                setInitialValues({ ...initialValues, healthCheckRating: HealthCheckRating.LowRisk});
                break;
            }
            case HealthCheckRating.HighRisk: {
                setInitialValues({ ...initialValues, healthCheckRating: HealthCheckRating.HighRisk});
                break;
            }
            case HealthCheckRating.CriticalRisk: {
                setInitialValues({ ...initialValues, healthCheckRating: HealthCheckRating.CriticalRisk});
                break;
            }
            default:
                return;
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validateEntryForm = (values: any) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string | { [field: string]: string } } = {};
        if (!values.type) {
            errors.type = requiredError;
        }
        if (!values.description) {
            errors.description = requiredError;
        }
        if (!isDate(values.date) || (isDate(values.date) && !/^[12](\d){3}-[01](\d){1}-[0-3](\d){1}$/.test(values.date))) {
            errors.date = 'date must be of format YYYY-MM-DD!';
        }
        if (!values.date) {
            errors.date = requiredError;
        }
        if (!values.specialist) {
            errors.specialist = requiredError;
        }

        switch (initialValues.type) {
            case 'Hospital': {
                if (!values.discharge.date || !isDate(values.discharge.date) || (isDate(values.discharge.date) && !/^[12](\d){3}-[01](\d){1}-[0-3](\d){1}$/.test(values.discharge.date))) {
                    errors.discharge = { date: 'date must be of format YYYY-MM-DD!' };
                }
                if (!values.discharge.criteria) {
                    errors.discharge = { criteria: requiredError };
                }
                break;
            }
            case 'HealthCheck': {
                if (values.healthCheckRating === undefined) {
                        errors.healthCheckRating = requiredError;
                }
                break;
            }
            case 'OccupationalHealthcare': {
                if (!values.employerName) {
                    errors.employerName = requiredError;
                }
                if (values.sickLeave.startDate !== '' && (isDate(values.sickLeave.startDate) && !/^[12](\d){3}-[01](\d){1}-[0-3](\d){1}$/.test(values.sickLeave.startDate)) || !isDate(values.sickLeave.startDate)) {
                    errors.sickLeave = { startDate: 'date must be of format YYYY-MM-DD!' };
                }
                if (values.sickLeave.endDate !== '' && (isDate(values.sickLeave.endDate) && !/^[12](\d){3}-[01](\d){1}-[0-3](\d){1}$/.test(values.sickLeave.endDate)) || !isDate(values.sickLeave.endDate)) {
                    errors.sickLeave = { endDate: 'date must be of format YYYY-MM-DD!' };
                }
                if (isDate(values.sickLeave.startDate) && /^[12](\d){3}-[01](\d){1}-[0-3](\d){1}$/.test(values.sickLeave.startDate) && (!isDate(values.sickLeave.endDate) || !/^[12](\d){3}-[01](\d){1}-[0-3](\d){1}$/.test(values.sickLeave.endDate) && isDate(values.sickLeave.endDate))) {
                    errors.sickLeave = { endDate: 'date must be of format YYYY-MM-DD!' };
                }
                if ((!/^[12](\d){3}-[01](\d){1}-[0-3](\d){1}$/.test(values.sickLeave.startDate) && isDate(values.sickLeave.startDate) || !isDate(values.sickLeave.startDate)) && isDate(values.sickLeave.endDate) && /^[12](\d){3}-[01](\d){1}-[0-3](\d){1}$/.test(values.sickLeave.endDate)) {
                    errors.sickLeave = { startDate: 'date must be of format YYYY-MM-DD!' };
                }
                break;
            }
            default:
                return errors;
        }

        return errors;
    };



    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            validate={validateEntryForm}
        >
            {({ dirty, isValid, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <SelectEntryTypeField
                            name="type"
                            label="Type"
                            options={typeOptions}
                            onChange={handleTypeSelect}
                        />
                        <Field
                            label="Description"
                            placeholder="Entry Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnosis)}
                        />

                        {initialValues.type === 'Hospital' && <><Field
                            label="Discharge Date"
                            placeholder="YYYY-MM-DD"
                            name="discharge.date"
                            component={TextField}
                        />
                            <Field
                                label="Discharge Criteria"
                                placeholder="discharge criteria"
                                name="discharge.criteria"
                                component={TextField}
                            /></>}

                        {initialValues.type === 'HealthCheck' &&
                            <SelectHealthCheckField
                                label="healthCheckRating"
                                name="healthCheckRating"
                                options={healthOptions}
                                onChange={handleHealthCheckRatingSelect}
                                
                            />}

                        {initialValues.type === 'OccupationalHealthcare' && <>
                            <Field
                                label="Employer Name"
                                placeholder="employer name"
                                name="employerName"
                                component={TextField}
                            />
                            <Field
                                label="Sick leave start date"
                                placeholder="sick leave start date"
                                name="sickLeave.startDate"
                                component={TextField}
                            />
                            <Field
                                label="Sick leave end date"
                                placeholder="sick leave end date"
                                name="sickLeave.endDate"
                                component={TextField}
                            />
                        </>}

                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button
                                    type="button"
                                    onClick={onCancel}
                                    color="red"
                                >Cancel</Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>);
            }}
        </Formik>
    );
};

export default AddEntryForm;