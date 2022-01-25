import Loader from "../../components/Loader";
import {useRouter} from "next/router";
import {useUser} from "../../helpers/action";

const User= () => {
  const {query} = useRouter();
  const { user, isLoading, isError } = useUser(query.id);

  if (isLoading) return <Loader />
  if (isError) return <h1>{isError}</h1>

  return (
    <div>
      {user ? <h1>{user.name}</h1> : <h2>no data...</h2>}
    </div>
  );
};

  export default User;