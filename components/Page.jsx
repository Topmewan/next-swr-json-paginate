import {useEffect, useState} from "react";
import {useUsers} from "../helpers/action";
import Card from "./Card";
import Loader from "./Loader";
import styles from '../styles/Page.module.css';

const Page = ({initUsers,page, limit, search}) => {
  const [ssrData, setSsrData] = useState(initUsers);
  const [isSWR, setIsSWR] = useState(false);
  const {users, isLoading, isError} = useUsers(page, limit, search);


  useEffect(() => {
    if (users) {
      setSsrData(users);
      setIsSWR(true);
    }
  }, [users])

  if (isSWR && isLoading) return <Loader/>
  if (isSWR && isError) return <h1>{isError}</h1>

  return (
    <>
      <div className={styles.card_container}>
        {ssrData?.map(user => <Card key={user.id} user={user}/>)}
      </div>
    </>

  );
};

export default Page;