import {useRouter} from "next/router";


const useQuery = () => {
  const router = useRouter();
  const {query} = router;
  let page = +query.page >= 1 ? +query.page : 1;
  let limit = +query.limit >= 1 ? +query.limit : 10;
  let search = query.search || '';

  return {
    router,
    page,
    limit,
    search
  }
}

export default useQuery;

