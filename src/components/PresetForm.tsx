import { Field, FieldProps, Form, Formik } from 'formik';
import {
    Button,
    Card,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    makeStyles,
    Radio,
    RadioGroup,
    TextField,
} from '@material-ui/core';
import React from 'react';

// import {delay} from "../utils/asyncUtils";

export interface PresetFormProps {
    initialValues: object;
    validationSchema: object;
    fields: PresetFieldProps[];
    submitText: string;
    submitPending: (values: any) => void;
    validate: (values: any) => any;
    // validate: <valuesType, ErrorType>(values: valuesType) => ErrorType
}

type depend = {
    id: string;
    value: string[];
};

type option = {
    label: string;
    value: string | number;
    exclude?: depend[];
    depend?: depend[];
};

interface PresetFieldProps {
    label: string;
    id: string;
    fieldType: FieldType;
    max?: number;
    canEdit?: boolean;
    depend?: depend;
    original?: object;
    staticOptions?: option[];
    required?: boolean;
}

export enum FieldType {
    Text,
    Select,
    Checkbox,
    Datepickers,
    Timepickers,
    Radiogroup,
    Slider,
    Switch,
    Divider,
    Textarea,
    Number,
}

const PresetField: React.FC<PresetFieldProps> = ({
    required,
    original = {},
    fieldType,
    label,
    id,
    staticOptions,
}) => {
    switch (fieldType) {
        case FieldType.Textarea:
            return (
                <Field name={id} key={id}>
                    {({
                        field,
                        meta: { error, value, initialValue, touched },
                    }: FieldProps) => (
                        <TextField
                            fullWidth
                            label={label}
                            variant="outlined"
                            multiline
                            margin="normal"
                            required={required}
                            error={
                                (touched || value !== initialValue) &&
                                Boolean(error)
                            }
                            helperText={
                                touched || value !== initialValue ? error : ''
                            }
                            {...field}
                        />
                    )}
                </Field>
            );
        case FieldType.Text:
            return (
                <Field name={id} key={id}>
                    {({
                        field,
                        meta: { error, value, initialValue, touched },
                    }: FieldProps) => (
                        <TextField
                            fullWidth
                            label={label}
                            variant="outlined"
                            margin="normal"
                            required={required}
                            error={
                                (touched || value !== initialValue) &&
                                Boolean(error)
                            }
                            helperText={
                                touched || value !== initialValue ? error : ''
                            }
                            {...field}
                        />
                    )}
                </Field>
            );
        case FieldType.Checkbox:
            return (
                <Field key={id} name={id}>
                    {({ field }: FieldProps) => <Checkbox name={id} />}
                </Field>
            );
        case FieldType.Radiogroup:
            return (
                <Field name={id} key={id}>
                    {({
                        field,
                        form,
                        meta: { error, value, initialValue, touched },
                    }: FieldProps) => (
                        <FormControl
                            margin="normal"
                            required={required}
                            error={
                                (touched || value !== initialValue) &&
                                Boolean(error)
                            }
                        >
                            <FormLabel>{label}</FormLabel>
                            <RadioGroup {...field}>
                                {staticOptions?.map(
                                    ({ value, label: radioLabel, exclude }) => {
                                        // const {[exc]} = form.values;
                                        let disabled = false;
                                        exclude?.forEach(({ id, value }) => {
                                            if (
                                                value.includes(form.values[id])
                                            ) {
                                                disabled = true;
                                            }
                                        });
                                        return (
                                            <FormControlLabel
                                                key={id + value}
                                                value={value}
                                                control={
                                                    <Radio
                                                        disabled={disabled}
                                                    />
                                                }
                                                label={radioLabel}
                                            />
                                        );
                                    }
                                )}
                            </RadioGroup>
                            <FormHelperText>
                                {touched || value !== initialValue ? error : ''}
                            </FormHelperText>
                        </FormControl>
                    )}
                </Field>
            );
        case FieldType.Number:
            return (
                <Field name={id} key={id}>
                    {({
                        field,
                        meta: { error, value, initialValue, touched },
                    }: FieldProps) => (
                        <TextField
                            variant="outlined"
                            label={label}
                            type="number"
                            fullWidth
                            required={required}
                            margin="normal"
                            error={
                                (touched || value !== initialValue) &&
                                Boolean(error)
                            }
                            helperText={
                                touched || value !== initialValue ? error : ''
                            }
                            {...field}
                        />
                    )}
                </Field>
            );
        default:
            return null;
    }
};
const useStyles = makeStyles({
    container: {},
    submitButton: {
        margin: '20px 10%',
        width: '80%',
    },
});
const PresetForm: React.FC<PresetFormProps> = ({
    submitPending,
    submitText,
    fields,
    initialValues,
    validationSchema,
    validate,
}) => {
    const classes = useStyles();
    return (
        <Formik
            initialValues={initialValues}
            validate={validate}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                submitPending(values);
            }}
        >
            {({ isValid, isSubmitting }) => (
                <Card className={classes.container}>
                    <Form>
                        {console.log(isSubmitting)}
                        {fields.map((filed) => (
                            <Container key={filed.id}>
                                <PresetField {...filed} />
                            </Container>
                        ))}
                        <Button
                            className={classes.submitButton}
                            type="submit"
                            variant="contained"
                            color="primary"
                            data-test="signin-submit"
                            disabled={!isValid || isSubmitting}
                        >
                            {submitText}
                        </Button>
                    </Form>
                </Card>
            )}
        </Formik>
    );
};

export default PresetForm;
