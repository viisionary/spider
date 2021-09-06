import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { object } from 'yup';
import { ItemPayload } from '../models/item';
import PresetForm, { FieldType } from '../components/PresetForm';

interface Props {}

const validationSchema = object({
    // name: string().required("text is required"),
});
const fields = [
    {
        label: '文本框示例1',
        id: 'text',
        fieldType: FieldType.Text,
        max: 10,
    },
    {
        label: '多选框组',
        id: 'checkbox',
        fieldType: FieldType.Checkbox,
    },
    {
        label: '单选框组',
        id: 'radioGroup',
        fieldType: FieldType.Radiogroup,
    },
    {
        label: '选择器',
        id: 'select',
        fieldType: FieldType.Select,
    },
    {
        label: '开关',
        id: 'switch',
        fieldType: FieldType.Switch,
    },
    {
        label: '滑条',
        id: 'slider',
        fieldType: FieldType.Slider,
    },
    {
        label: '时间选择器',
        id: 'timePickers',
        fieldType: FieldType.Timepickers,
    },
    {
        label: '日期选择器',
        id: 'datePickers',
        fieldType: FieldType.Datepickers,
    },
    {
        label: '级联选择',
        id: 'ca',
        fieldType: FieldType.Datepickers,
    },
];

const useStyles = makeStyles((theme) => ({}));
const CreateContainer: React.FC<Props> = () => {
    const initialValues: ItemPayload = {
        name: '',
        time: '',
    };
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <PresetForm
                {...{
                    validationSchema,
                    initialValues,
                    fields,
                    validate: (values: any) => {},
                    // validationSchema,
                    // initialValues,
                    // validate,
                    // fields: conferenceFields,
                    submitText: '发起会议',
                    submitPending: () => {},
                }}
            />
        </Container>
    );
};
export default CreateContainer;
