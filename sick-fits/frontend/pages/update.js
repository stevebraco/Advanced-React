import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage({ query: { id } }) {
  return (
    <div>
      <UpdateProduct id={id} />
    </div>
  );
}
