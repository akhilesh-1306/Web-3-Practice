import { useState } from 'react'
import './App.css'
import {QueryClient, useQuery, useQueryClient, QueryClientProvider} from "@tanstack/react-query"

async function getter() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/");
  const response = await data.json();
  return response;
}

const queryClient = new QueryClient()

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <Posts />
      </QueryClientProvider>
  )
}

function Posts(){
  const {data, isLoading, error} = useQuery({queryKey : ['posts'], queryFn : getter, refetchInterval : 5 * 1000});

  if(error){
    return(
      <div>
        Error while loading
      </div>
    )
  }
  if(isLoading){
    return(
      <div>
        Loading ...
      </div>
    )
  }
  return(
    <div>
      {JSON.stringify(data)}
    </div>
  )
}

export default App
