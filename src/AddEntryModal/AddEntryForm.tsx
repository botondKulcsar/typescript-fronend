import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Entry, HospitalEntry } from "../types";

export type EntryFormValues = Omit<Entry, 'id'>;
type HospitalEntryFormValues = Omit<HospitalEntry, 'id'>;

interface Props {
    onSubmit: (values: HospitalEntryFormValues) => void;
    onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnosis }] = useStateValue();
    return (
        <Formik
            initialValues={{
                type: 'Hospital',
                description: '',
                date: '',
                specialist: '',
                diagnosisCodes: [],
                discharge: {
                    date: '',
                    criteria: ''
                }
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string | { [field: string]: string } } = {};
                if (!values.type) {
                    errors.type = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date.match(/^[12](\d){3}-[01]\d-[0-3]\d$/gm)) {
                    errors.date = "Valid date is required";
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.discharge.date) {
                    errors.discharage = { date: 'Discharge Date is required!' };
                    console.log(errors.discharage.date);
                }
                if (!values.discharge.criteria) {
                    errors.discharage = { criteria: requiredError };
                }
                return errors;
            }}
        >
            {({ dirty, isValid, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Type"
                            placeholder="Entry Type"
                            name="type"
                            component={TextField}
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
                        <Field
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
                        />
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