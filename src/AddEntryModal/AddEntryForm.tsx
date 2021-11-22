import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Entry } from "../types";

export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
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
                    date:'',
                    criteria: ''
                }
            }}
            onSubmit={onSubmit}
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