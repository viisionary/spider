import React from 'react';
import {Container, makeStyles} from "@material-ui/core";
import {object, string} from "yup";
import {ItemPayload} from "../models/item";
import PresetForm, {FieldType} from "../components/PresetForm";

interface Props {
}

const validationSchema = object({
    // name: string().required("text is required"),
});
const fields = [{
    label: '文本框示例1',
    id: 'text',
    fieldType: FieldType.text,
    max: 10,
}, {
    label: '多选框组',
    id: 'checkbox',
    fieldType: FieldType.checkbox,
}, {
    label: '单选框组',
    id: 'radioGroup',
    fieldType: FieldType.radioGroup,
}, {
    label: '选择器',
    id: 'select',
    fieldType: FieldType.select,
},
    {
        label: '开关',
        id: 'switch',
        fieldType: FieldType.switch,
    },
    {
        label: '滑条',
        id: 'slider',
        fieldType: FieldType.slider,
    },
    {
        label: '时间选择器',
        id: 'timePickers',
        fieldType: FieldType.timePickers,
    },
    {
        label: '日期选择器',
        id: 'datePickers',
        fieldType: FieldType.datePickers,
    },
    {
        label: '级联选择',
        id: 'ca',
        fieldType: FieldType.datePickers,
    }
];

const useStyles = makeStyles((theme) => ({}));
const ItemCreateContainer: React.FC<Props> = () => {
    const initialValues: ItemPayload = {
        name: '',
        time: ''
    };
    const classes = useStyles();


    return (<Container component="main" maxWidth="xs">
        <PresetForm {...{validationSchema, initialValues, fields}} />
    </Container>)
}
export default ItemCreateContainer;
