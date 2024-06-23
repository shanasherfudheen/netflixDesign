import React, {useEffect, useState} from 'react'
import Youtube from 'react-youtube'
import './RowPost.css'
import axios from '../../axios'
import {imageUrl, API_KEY} from '../../constants/Constants'

function RowPost(props) {
  const [movies, setmovies] = useState([])
  const [urlId, setUrlId] = useState('')
  useEffect(()=>{
    axios.get(props.url).then((response)=>{
      console.log(response.data)
      setmovies(response.data.results)
    }).catch(err=>{
      // alert('Network Error Occured')
    })
  }, [])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie = (id)=>{
    console.log(id)
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data)
      if(response.data.length !== 0) {
        setUrlId(response.data.results[0])
      } else {
        console.log('Trailer not available')
      }
    })
  }
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className="posters">
          {
            movies.map((obj)=>{
              return(
                <img onClick={()=>{handleMovie(obj.id)}} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="poster" />
              )
            })
          }
            
            
        </div>
        {urlId && <Youtube opts={opts} videoId={urlId.key}/> }
    </div>
  )
}

export default RowPost