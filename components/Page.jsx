import Card from "./Card";
import {useUsers} from "../helpers/action";
import Loader from "./Loader";
import styles from '../styles/Page.module.css';
import {useEffect, useState} from "react";

const Page = ({page, limit, search, initUsers}) => {
  const [ssrData, setSsrData] = useState(initUsers);
  const [isSWR, setIsSWR] = useState(false);
  const {users, isLoading, isError} = useUsers(page, limit, search);

  if (isSWR && isLoading) return <Loader/>
  if (isSWR && isError) return <h1>{isError}</h1>

  useEffect(() => {
    if (users) {
      setSsrData(users);
      setIsSWR(true);
    }
  }, [users])

  return (
    <>
      <div className={styles.card_container}>
        {users?.map(user => <Card key={user.id} user={user}/>)}
      </div>
    </>

  );
};

export default Page;