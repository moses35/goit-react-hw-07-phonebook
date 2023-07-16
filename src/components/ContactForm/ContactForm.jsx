import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Form, ErrorMessage } from 'components/ContactForm/ContactForm.styled';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const contactSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
  phone: yup
    .string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

export const ContactForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { name: '', phone: '' },
    resolver: yupResolver(contactSchema),
  });
  const inputName = nanoid();
  const inputNumber = nanoid();

  return (
    <>
      <Form
        onSubmit={handleSubmit(data => {
          onSubmit({ ...data });
          reset();
        })}
      >
        <label htmlFor={inputName}>Name</label>
        <input
          type="text"
          {...register('name', { required: true })}
          id={inputName}
        />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
        <label htmlFor={inputNumber}>Number</label>
        <input
          type="tel"
          {...register('phone', { required: true })}
          id={inputNumber}
        />
        <ErrorMessage>{errors.phone?.message}</ErrorMessage>
        <button type="submit">Add contact</button>
      </Form>
    </>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
