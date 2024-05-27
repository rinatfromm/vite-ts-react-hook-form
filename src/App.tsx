import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import { IOption, IShippingFields } from './app.interface';
import { options } from './options';
import './App.css';

function App() {
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<IShippingFields>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<IShippingFields> = (data) => {
    alert(`Your name: ${data.name}\nYour address: ${data.address.country}\nYour email: ${data.email}`);
    reset();
  };

  const getValue = (value: string | null): IOption | null =>
    value ? options.find(option => option.value === value) || null : null;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='formContainer'>
        <input {...register('name', { required: 'Name is required' })} placeholder='Name' className='formInput' />
        {errors?.name && (<div style={{ color: "red" }} className='formError'>{errors.name.message}</div>)}

        <input {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Please enter a valid email address'
          }
        })}
          placeholder='Email'
          className='formInput' />
        {errors?.email && (<div style={{ color: "red" }} className='formError'>{errors.email.message}</div>)}

        <Controller
          control={control}
          name="address.country"
          rules={{ required: 'Country is required' }}
          render={({ field: { onChange, value }, fieldState: { error } }) =>
            <div>
              <ReactSelect
                placeholder='Countries'
                options={options}
                value={getValue(value)}
                onChange={newValue => onChange((newValue as IOption).value)}
                className='select'
              />
              {error && <div style={{ color: "red" }}>{error.message}</div>}
            </div>
          }
        />
        <div>
          <button type="submit" className='submitButton'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;

