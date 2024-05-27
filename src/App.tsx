import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IOption, IShippingFields } from './app.interfece.ts';
import ReactSelect from 'react-select';
import { options } from './options.ts';
import { getValue } from './utils.ts';
import './App.css'

function App() {
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<IShippingFields>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<IShippingFields> = (data) => {
    alert(` Your name: ${data.name} \n Your address: ${data.address.country.label}\n Your email: ${data.email}`)
    reset()
  };

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
          rules={{
            required: 'Country is require'
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) =>
            <div>
              <ReactSelect
                placeholder='Countries'
                options={options}
                value={getValue(value)}
                onChange={newValue => onChange((newValue as IOption))}
                className='select'
              />
              {error && <div style={{ color: "red" }}>{error.message}</div>}
            </div>
          } />
        <div>
          <button type="submit" className='submitButton'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
