import React, { useEffect, useState } from 'react'
import SideNavGenreList from '../Componets/SideNavGenreList'
import GlobalApi from '../Servies.js/GlobalApi'
import Slider from '../Componets/Slider'
import PopularGameList from '../Componets/PopularGameList'
import TrendingGameList from '../Componets/TrendingGameList'
import PlayableGame from '../Componets/PlayableGame'

function Home() {
    const [gameList,setGameList]=useState([])
    const [gameListByGenre,setGameListByGenre]=useState([])

    

    useEffect(()=>{
      
      GlobalApi.getPopularGame.then(resp=>{
        console.log(resp)
        setGameList(resp.data.results);
       
    })
    getGameList(4)
    },[])
    const getGameList=(genreId)=>{
      console.log(genreId)
      if(genreId!=0)
      {
        GlobalApi.getGameListByGenreId(genreId).then(resp=>{
          console.log(resp)
          setGameListByGenre(resp.data.results)
      })
      }
     
    }
  return (
    <div className='grid grid-cols-4 p-8'>
        <div className='hidden md:flex'>
          <SideNavGenreList selectedGenreId={(genreId)=>getGameList(genreId)} />
          <PlayableGame />
          <span className='text-white '>Hi everyone </span>
        </div>
       <div className='md:col-span-4 col-span-4 px-3'>
            <PlayableGame />
            <span className='text-white'>Hi everyone </span>
            <Slider game={gameListByGenre[0]} />
            <TrendingGameList gameList={gameList}/>
            <PopularGameList gameList={gameListByGenre} />
        </div>
    </div>
  )
}

export default Home