"use client"

import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation';
import { useFavorites } from '@/hooks/useCapstones';
import FavIdeas from './FavIdeas';
import Header from '@/components/Header';
import SpinnerCircle2 from '@/components/spinner-08';
import { useCheckAuth } from '@/hooks/useCheckAuth';

const page = () => {
const router = useRouter();
const { checkAuthAndRedirect } = useCheckAuth();
const params = useParams();
const userId = params.userId as string;

useEffect(() => {
  const checkAccess = async () => {
    const user = await checkAuthAndRedirect();
    if (!user) return;
    
    if (user.id !== userId) {
      router.push(`/favorites/${user.id}`);
    }
  };
  
  checkAccess();
}, [userId, checkAuthAndRedirect, router]);

if (!userId) return null; 
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