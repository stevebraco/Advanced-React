import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import CURRENT_USER_QUERY from './User';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      id
      email
      name
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refetch the currently logged in user - au moment du submut on actualise la page avec la connexion user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  // const error =
  //   data?.authenticateUserWithPassword.__typename ===
  //   'UserAuthenticationWithPasswordFailure'
  //     ? data?.authenticateUserWithPassword
  //     : undefined;

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signup().catch(console.error);
    console.log(res);
    console.log({ data, loading, error });
    resetForm();
    // send email and password to the graphQlAPI
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a password request</h2>
      <Error error={error} />
      <fieldset>
        {data?.createUser && (
          <p>
            {' '}
            Signed up with {data.createUser.email} - Please Go Head and Sign in!
          </p>
        )}

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <button type="submit"> Request Reset </button>
      </fieldset>
    </Form>
  );
}
