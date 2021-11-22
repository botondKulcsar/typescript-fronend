import React from "react";
import { Field } from "formik";
import { Form } from "semantic-ui-react";
import { EntryType, HealthCheckRating } from "../types";



export type EntryTypeOption = {
    value: EntryType,
    label: string
};

export interface SelectEntryTypeFieldProps{
    name: string;
    label: string;
    options: EntryTypeOption[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (event: any) => void;
}

export const SelectEntryTypeField = ({ 
    name, 
    label, 
    options,
    onChange 
}: SelectEntryTypeFieldProps) => (
    <Form.Field>
        <label>{label}</label>
        <Field as="select" name={name} className="ui dropdown" onChange={onChange} >
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label || option.value}
                </option>
            ))}
        </Field>
    </Form.Field>
);



export type HealthCheckRatingType = {
    value: HealthCheckRating,
    label: string
};

export interface SelectHealthCheckFieldProps {
    name: string;
    label: string;
    options: HealthCheckRatingType[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (event: any) => void
}

export const SelectHealthCheckField = ({
    name,
    label,
    options,
    onChange
}: SelectHealthCheckFieldProps) => (
    <Form.Field>
        <label>{label}</label>
        <Field as="select" name={name} className="ui dropdown" onChange={onChange}>
            {options.map(option =>(
                <option key={option.value} value={option.value}>
                    {option.label || option.value}
                </option>
            ))}
        </Field>
    </Form.Field>
);