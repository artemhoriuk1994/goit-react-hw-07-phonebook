import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Btn from "components/Button/Button";
import styled from '@emotion/styled';
import { useAddContactsMutation, useGetContactsQuery } from 'redux/contactSlice';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from 'components/Loader/Loader';


const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.space[4]}px;
  margin-top: ${p => p.theme.space[4]}px;
`
const ErrorStyled = styled.p`
  color: ${p => p.theme.colors.redAccent};
  text-transform: uppercase;
`
const Input = styled.input`
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
const schem = yup.object().shape({
    name: yup.string().required(),
    phone: yup.string().min(13).max(13).required()
})

export const Forms = () => {
    const [addContact, { isLoading }] = useAddContactsMutation();
    const { data: contacts } = useGetContactsQuery();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schem)
    });

    const onFormSubmit = async data => {
        isIncludeName(data.name) ?
            toast.error(`${data.name} is alredy in your contacts`) :
            await addContact(data)
        reset();
    };

    const isIncludeName = (inputName) => {
        return contacts.find(
            contact => contact.name.toLowerCase() === inputName.toLowerCase()
        )
    }

    return (
        <FormStyled onSubmit={handleSubmit(onFormSubmit)}>
            <label htmlFor='name' >
                Name </label>
            <Input
                type="text"
                name="name"
                {...register('name')}
                placeholder='John Doe'
            />
            <ErrorStyled>{errors.name?.message}</ErrorStyled>
            <label htmlFor='number'>
                Phone  </label>
            <Input
                type="tel"
                name="phone"
                {...register('phone')}
                placeholder='+380970000000'
            />
            <ErrorStyled>{errors.number?.message}</ErrorStyled>
            <Btn type="submit" disabled={isLoading}>{isLoading ? <Loader size={50} /> : 'Add contact'}</Btn>
            <Toaster position="top-right"
                reverseOrder={false} />
        </FormStyled>
    )
}


