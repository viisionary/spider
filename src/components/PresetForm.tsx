import {Field, FieldProps, Form, Formik} from "formik";
import {Button, Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import React from "react";

interface PresetFormProps {
    initialValues: object,
    validationSchema: object,
    fields: PresetFieldProps[],
}

type depend = {
    id: string,
    value: string[]
}

interface PresetFieldProps {
    label: string,
    id: string,
    fieldType: FieldType,
    max?: number,
    canEdit?: boolean,
    depend?: depend,
    original?: object,
}

export enum FieldType {
    text,
    select,
    checkbox,
    datePickers,
    timePickers,
    radioGroup,
    slider,
    switch,
    divider
}

const PresetField: React.FC<PresetFieldProps> = ({original = {}, fieldType, label, id}) => {
    switch (fieldType) {
        case FieldType.text:
            return (
                <Field name={id}>
                    {({field, meta: {error, value, initialValue, touched}}: FieldProps) => (
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id={id}
                            label={label}
                            type="text"
                            autoFocus
                            data-test={`form-${id}`}
                            error={(touched || value !== initialValue) && Boolean(error)}
                            helperText={touched || value !== initialValue ? error : ""}
                            {...original}
                            {...field}
                        />
                    )}
                </Field>)
        case FieldType.checkbox:
            return (<Field name={id}>{({field}: FieldProps) => (<Checkbox name={id} />)}
            </Field>)
        default:
            return null
    }
}
const PresetForm: React.FC<PresetFormProps> = ({fields, initialValues, validationSchema}) => {

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, {setSubmitting}) => {
                console.log('-----')
                console.log('values',values)
                setSubmitting(true);
            }}
        >
            {({isValid, isSubmitting}) => (
                <Form>
                    {fields.map((filed) => <PresetField {...filed} key={filed.id} />)}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        data-test="signin-submit"
                        disabled={!isValid || isSubmitting}
                    >
                        submit
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default PresetForm
