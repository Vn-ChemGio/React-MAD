/* eslint react/jsx-key: off */
import React from 'react';
import { Edit, SimpleForm, TextField, TextInput, required } from 'react-admin1';

const TagEdit = props => (
    <Edit {...props}>
        <SimpleForm redirect="list">
            <TextField source="id" />
            <TextInput source="name" validate={[required()]} />
        </SimpleForm>
    </Edit>
);

export default TagEdit;
