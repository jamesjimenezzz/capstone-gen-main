import React from 'react'
import { CapstoneIdea } from '@/services/capstone-service'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { useState } from 'react'
import { useDeleteFavorite, useInsertFavorite } from '@/hooks/useCapstones'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const FavIdeas = ({fav}: {fav: CapstoneIdea}) => {


    const [isFavorite, setIsFavorite] = useState(true);
    const { mutate: deleteFavorite } = useDeleteFavorite();
    const { mutate: insertFavorite } = useInsertFavorite();


    
  return (
   
         <Card className='flex flex-col h-full'>
        <CardHeader className="">
          <div className="flex  justify-between">
            <CardTitle>{fav.title}</CardTitle>
            <CardTitle className=" ">
              <Star
                className={`w-4 h-4 text-muted-foreground  hover:text-foreground cursor-pointer ${
                  isFavorite ? "text-yellow-500 fill-yellow-500" : ""
                }`}
                onClick={() => {
                  if (isFavorite) {
                    deleteFavorite(fav.capstone_id);
                    setIsFavorite(false);
                  } else {
                    insertFavorite(fav);
                    setIsFavorite(true);
                  }
                }}
              />
            </CardTitle>
          </div>

          <CardDescription>{fav.feasibility}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p>{fav.description}</p>
        </CardContent>
       
        <CardFooter className="text-xs flex gap-3 mt-auto">
          {fav.tags.map((fav, i) => (
            <span
              className="dark:bg-stone-900 bg-gray-200 rounded-xl text-center px-2.5 py-1.5"
              key={i}
            >
              {fav}
            </span>
          ))}
        </CardFooter>
        <Button variant={"outline"}  className='w-full'>
            <Link href={`/capstone/${fav.capstone_id}`}>
            View
            </Link>
            </Button>
      </Card>
   
  )
}

export default FavIdeas