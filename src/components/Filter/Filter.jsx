import PropTypes from 'prop-types';
import { Form } from 'components/Filter/Filter.styled';
import { ErrorMessage } from 'components/ContactForm/ContactForm.styled';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const filterSchema = yup.object().shape({
  filter: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
});

export const Filter = ({ onChange }) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { filter: '' },
    resolver: yupResolver(filterSchema),
  });
  const inputFilter = nanoid();

  return (
    <Form>
      <label htmlFor={inputFilter}>Find contacts by name</label>
      <input
        type="text"
        {...register('filter')}
        onChange={onChange}
        id={inputFilter}
      />
      <ErrorMessage>{errors.filter?.message}</ErrorMessage>
    </Form>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
