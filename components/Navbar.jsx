import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useUsers} from "../helpers/action";
import styles from '../styles/Header.module.css';
import Button from "./Ui/Button";

const Navbar = () => {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  const router = useRouter();
  const {query, pathname} = router;


  useEffect(() => {
    if (query.page) {
      let currentPage = +query.page >= 1 ? query.page : 1;
      setPage(+currentPage);
    }
    if (query.limit) {
      let currentLimit = +query.limit >= 10 ? query.limit : 10;
      setLimit(+currentLimit);
    }
  }, [query.page, query.limit])

  const {users, isLoading} = useUsers(page + 1, limit);

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    router.replace(`?search=${search}`);
    setSearch('');
  }

  const handlePaginate = (pageIndex) => {
    let currentPage = pageIndex >= 1 ? pageIndex : 1;
    router.replace(`?page=${currentPage}&limit=${limit}`);
  }

  const handlePerPage = (limitNumber) => {
    router.replace(`?page=${1}&limit=${limitNumber}`);
  }

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <div className="logo">
          {pathname !== '/'
            ? <div onClick={() => router.back()} style={{cursor: 'pointer'}}>
              Go back
            </div>
            : <Link href={`/?page=${1}&limit=${limit}`} replace shallow={true}>
              <a href="">Home</a>
            </Link>}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder='Search input'
            onChange={handleChange}
            value={search}
            disabled={pathname !== '/'}/>

          <Button disabled={pathname !== '/'} className='buttonClassic'>
            Search
          </Button>
        </form>

        <div className={styles.row}>
          <Button
            onClick={() => handlePaginate(page - 1)}
            disabled={pathname !== '/' || (page === 1)}
          >
            <i className="fas fa-chevron-left"></i>
          </Button>
          <span>{page}</span>
          <Button
            onClick={() => handlePaginate(page + 1)}
            disabled={pathname !== '/' || isLoading || !users.length}
          >
            <i className="fas fa-chevron-right"></i>
          </Button>
        </div>

        <div>
          <label htmlFor="per-page">Per Page:</label>
          <select
            name=""
            id="per-page"
            onChange={e => handlePerPage(e.target.value)}
            value={limit}
            disabled={pathname !== '/'}>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

      </div>
    </header>
  );
};

export default Navbar;