"use client"

import React from 'react'
import { useParams } from 'next/navigation';
import { useFavorites } from '@/hooks/useCapstones';
import FavIdeas from './FavIdeas';
import Header from '@/components/Header';
import SpinnerCircle2 from '@/components/spinner-08';

const page = () => {

const params = useParams();
const userId = params.userId as string;

if (!userId) return null; // or a loading spinner
const { data: favorites, isLoading, isFetching } = useFavorites(userId);
console.log(favorites)


  return (
    <div className='px-2 pt-3 max-w-[1200px] mx-auto'>
        <Header />
        <h1 className='text-2xl mt-5 font-bold'>Your Favorites</h1>
        {isLoading && <SpinnerCircle2 />}

        <div className='grid grid-cols-3 gap-4 mt-5'>
        {favorites?.map((fav) => <FavIdeas key={fav.capstone_id} fav={fav} />)}
        </div>
      
        
    </div>
  )
}

export default page