import Link from 'next/link';

const Card = ({user}) => {
  return (
    <div className='card'>
      <Link href={`/users/${user?.id}`}>
        <a>
          <h1>{user.name}</h1>
          <img src={user?.avatar} loading='lazy' alt=""/>
        </a>
      </Link>
    </div>

  );
};

export default Card;