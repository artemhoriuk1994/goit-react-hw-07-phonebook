import * as yup from 'yup';
import Btn from "components/Button/Button";
import { Field, Formik, Form, ErrorMessage } from "formik";
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.space[4]}px;
  margin-top: ${p => p.theme.space[4]}px;
`
const ErrorStyled = styled(ErrorMessage)`
  color: ${p => p.theme.colors.redAccent};
`
const Input = styled(Field)`
  margin-top: ${p => p.theme.space[2]}px;
  padding: ${p => p.theme.space[3]}px;
  font-size: ${p => p.theme.fontSizes.s};
  border: ${p => p.theme.borders.none};
  outline: none;
  border-radius: ${p => p.theme.radii.sm};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: box-shadow 300ms linear;
:hover,
:focus{
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
`

export const Forms = ({ onSubmit }) => {
    const schem = yup.object().shape({
        name: yup.string().required(),
        number: yup.string().min(13, 'Too short!').max(13, "Too long!").required()
    })
    const handleSubmit = (values, { resetForm }) => {
        onSubmit(values);
        resetForm();
    }
    return (
        <Formik initialValues={{
            name: '',
            number: '',
        }}
            onSubmit={handleSubmit}
            validationSchema={schem}>
            <FormStyled>
                <label htmlFor='name' >
                    Name </label>
                <Input
                    type="text"
                    name="name"
                    placeholder='John Doe'
                />
                <ErrorStyled name="name" />
                <label htmlFor='number'>
                    Phone  </label>
                <Input
                    type="tel"
                    name="number"
                    placeholder='+380970000000'
                />
                <ErrorStyled name="number" component='div' />
                <Btn type="submit">Add contact</Btn>
            </FormStyled>
        </Formik>
    )
}

Forms.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

