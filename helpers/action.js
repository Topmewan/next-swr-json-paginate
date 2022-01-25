import useSWR from 'swr';

export function useUsers (page,limit,search) {
  let url = 'http://localhost:5000/users/?_sort=createdAt&_order=desc'

  if(search){
    url = `${url}&q=${search}`
  } else {
    url =`${url}&_page=${page}&_limit=${limit}`
  }
  const { data, error } = useSWR(url)


  return {
    users: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useUser (id) {
  const { data, error } = useSWR(id ? `http://localhost:5000/users/${id}` : null)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}