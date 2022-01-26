import Loader from "../../components/Loader";
import {useRouter} from "next/router";
import {useUser} from "../../helpers/action";
import styles from '../../styles/User.module.css'
import Image from "next/image";

const User = () => {
  const {query} = useRouter();
  const {user, isLoading, isError} = useUser(query.id);

  if (isLoading) return <Loader/>
  if (isError) return <h1>{isError}</h1>

  return (
    <div className={styles.container}>
      <div className={styles.content}>
          <img className={styles.image} src={user.avatar} alt=""/>
        <div className={styles.name}>
          <p>{user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default User;