import styled from '@emotion/styled';
import { Box } from 'components/box';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { filteredContact } from 'redux/reducer';

const SearchForm = styled.form`
  margin: ${p => p.theme.space[4]}px 0;
`
const Input = styled.input`
  margin-top: ${p => p.theme.space[2]}px;
  padding: ${p => p.theme.space[3]}px;
  font-size: 16px;
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
export const Filter = () => {
    const dispatch = useDispatch();
    const { register } = useForm();


    const onChangeHandler = (e) => {
        const filtered = e.target.value;
        dispatch(filteredContact(filtered))
    }

    return (
        <SearchForm>
            <Box as="label" display="flex" flexDirection="column">
                Find contacts by name
                <Input
                    type="text"
                    name="filter"
                    {...register('filter')}
                    onChange={onChangeHandler}
                    placeholder="Search name"
                />
            </Box>
        </SearchForm>
    )
};


export default Filter;