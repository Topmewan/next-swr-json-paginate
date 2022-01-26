import Link from 'next/link';
import styles from '../styles/Card.module.css';
import useQuery from "../helpers/useQuery";
import {useUsers} from "../helpers/action";
import {DataContext} from "../store/globalContext";
import {useContext} from "react";
import axios from "axios";

const Card = ({user}) => {
  const {page, limit, search} = useQuery();
  const {users, mutate} = useUsers(page, limit, search);
  const {setUserState} = useContext(DataContext);

  const handleDelete = async (id) => {
    const newUsers = users.filter(user => user.id !== id);
    mutate(newUsers, false);
    await axios.delete(`http://localhost:5000/users/${id}`);
    mutate()
  }

  const handleUpdate = (user) => {
    setUserState(user);
  }

  return (
    <div className={styles.card}>
      <Link href={`/users/${user?.id}`}>
        <a>
          <h1>{user.name}</h1>
          <img src={user?.avatar} loading='lazy' alt=""/>
        </a>
      </Link>
      <div className={styles.menu}>
        <i className='fas fa-pencil-alt' onClick={() => handleUpdate(user)}/>
        <i className='fas fa-trash' onClick={() => handleDelete(user.id)}/>
      </div>
    </div>

  );
};

export default Card;