import Card from "./Card";
import {useUsers} from "../helpers/action";
import Loader from "./Loader";

const Page = ({page,limit,search}) => {
  const { users, isLoading, isError } = useUsers(page,limit,search);

  if (isLoading) return <Loader />
  if (isError) return <h1>{isError}</h1>

  return (
    <>
      <div className='card_container'>
        {users?.map(user => <Card key={user.id} user={user}/>)}
      </div>
    </>

  );
};

export default Page;