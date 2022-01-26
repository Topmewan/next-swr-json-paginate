import Loader from "../../components/Loader";
import {useUser} from "../../helpers/action";
import styles from '../../styles/User.module.css'
import axios from "axios";
import {useEffect, useState} from "react";
import Image from "next/image";

const User = ({initUser, id}) => {
  const [ssrUser, setSsrUser] = useState(initUser);
  const [isSWR, setIsSWR] = useState(false);

  const {user, isLoading, isError} = useUser(id);

  useEffect(() => {
    if (user) {
      setSsrUser(user);
      setIsSWR(true);
    }
  }, [user])

  if (isSWR && isLoading) return <Loader/>
  if (isSWR && isError) return <h1>{isError}</h1>

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image src={ssrUser.avatar} width={700} height={400} objectFit={'cover'} priority alt={'avatar'}/>
        </div>
        <div className={styles.name}>
          <p>{ssrUser.name}</p>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await axios.get('http://localhost:5000/users/');
  const users = res.data;

  const paths = users.map((user) => ({
    params: {id: user.id.toString()},
  }))
  return {paths, fallback: 'blocking'}
}

export async function getStaticProps({params}) {
  const res = await axios.get(`http://localhost:5000/users/${params.id}`);
  return {
    props: {
      initUser: res.data,
      id: params.id
    },
    revalidate: 10,
  }
}

export default User;
