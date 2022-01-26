import {useContext} from "react";
import {DataContext} from "../store/globalContext";
import {useUsers} from "../helpers/action";
import useQuery from "../helpers/useQuery";
import axios from "axios";
import Button from "./Ui/Button";
import {useRouter} from "next/router";

const Input = () => {

  const {userState, setUserState, initUser} = useContext(DataContext);
  let {id, name, createdAt, avatar} = userState;
  const router = useRouter();

  const {page, limit, search} = useQuery();
  const {users, mutate} = useUsers(page, limit, search);

  const handleChange = (e) => {
    setUserState({...userState, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      name,
      avatar,
      createdAt: id ? createdAt : new Date()
    }

    if (id) {
      const newUsers = users.map(user => user.id === id ? {...newUser, id} : user);
      mutate(newUsers, false);
      await axios.put(`http://localhost:5000/users/${id}`, newUser)
    } else {
      router.replace(`?page=${1}&limit=${limit}`);
      const res = await axios.post('http://localhost:5000/users', newUser);
      mutate([res.data, ...users], false);
    }

    setUserState(initUser);
    mutate();
  }


  return (
    <form onSubmit={handleSubmit} className='user_input wrap'>
      <div className='input-group'>
        <label htmlFor="name">Name</label>
        <input type="text" name='name' placeholder='Enter Name' onChange={handleChange} value={name}/>
      </div>

      <div className='input-group'>
        <label htmlFor="avatar">Avatar</label>
        <input type="text" name='avatar' placeholder='Enter Avatar Link' onChange={handleChange} value={avatar}/>
      </div>
      <Button className='buttonClassic' type='submit'>
        {id ? 'Update' : 'Add'}
      </Button>
    </form>
  );
};

export default Input;