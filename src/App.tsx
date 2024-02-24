import { joiResolver } from "@hookform/resolvers/joi";
import { SubmitHandler, useForm } from "react-hook-form";
import Joi from 'joi';

// type FormFields = {
//   email: string,
//   password: string,
// }

interface FormData {
  email: string,
  password: string,
}

const schema = Joi.object({
  email: Joi.string().min(5).max(200).required().label("Email"),
  password: Joi.string().min(8).max(1000).required().label("password")
})

const App = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: joiResolver(schema)
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  }
  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            {...register('email')}
            type="email"
            className="form-control"
            id="email"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            {...register('password')}
            type="password"
            className="form-control"
            id="password"
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          // disabled={!isValid}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default App;