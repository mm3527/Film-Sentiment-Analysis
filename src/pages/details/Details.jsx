import './details.css'

import { useParams } from 'react-router-dom'
import React, { useState } from 'react'
import Img from '../../components/Img'
import FetchData from '../../hooks/FetchData'
import { BannerSkeleton, ImgSkeleton } from '../../components/Skeleton'
import dayjs from 'dayjs'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Card from '../../components/Card'

import { PlayIcon } from '../../assets/PlayIcon'

import VideoPopUp from '../../components/videoPopUp'
import ChatbotApp from '../../components/openAI'

import { useSelector, useDispatch } from 'react-redux'
import { getApi } from '../../store/homeSlice'

function Details() {
  const { id, mediaType } = useParams()
  const { data, loading } = FetchData(`/${mediaType}/${id}`)
  const credits = FetchData(`/${mediaType}/${id}/credits`)
  const video = FetchData(`/${mediaType}/${id}/videos`)
  const similarMovie = FetchData(`/${mediaType}/${id}/similar`)
  const recommendations = FetchData(`/${mediaType}/${id}/recommendations`)

  const dispatch = useDispatch()

  const [isVisible, setIsVisible] = useState(false)
  const [videoId, setVideoID] = useState('')
  const [apiErr, setApiErr] = useState('')

  const [apiInput, setApiInput] = useState('')

  const UsersApiKey = useSelector((state) => state.home.API_KEY)

  const title = data?.title ?? data?.name

  const handleToggle = () => {
    setIsVisible((prev) => !prev)
  }

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`
  }

  const submitAPIKey = (e) => {
    e.preventDefault()
    if (apiInput.startsWith('sk-')) {
      dispatch(getApi(apiInput))
      setApiErr('')
    } else {
      setApiErr('Invalid API key')
    }
  }

  return (
    <>
      {isVisible && <VideoPopUp handleToggle={handleToggle} videoId={videoId} />}

      <div className="details">
        <div className="mask1" />
        <div className="mask2" />
        <div className="banner_image">
          {loading ? <BannerSkeleton /> : <Img url={data?.backdrop_path} />}
        </div>

        <div className="Details_banner">
          <div className="details_poster">
            {loading ? (
              <ImgSkeleton />
            ) : (
              <Img url={data?.backdrop_path} />
            )}
          </div>
          <div className="details_contents">
            <div className="details_title">
              {`${title} (${dayjs(data?.release_date).format('YYYY')})`}
            </div>
            <div className="details_subtitle">{data?.tagline}</div>

            <div className="detail_tabs">
              <div className="rating">
                <CircularProgressbar
                  maxValue={10}
                  value={data?.vote_average}
                  background
                  backgroundPadding={6}
                  styles={buildStyles({
                    backgroundColor: 'transparent',
                    textColor: '#fff',
                    pathColor:
                      data?.vote_average > 8.5
                        ? '#74bd5d'
                        : data?.vote_average < 3.0
                        ? '#FF3B28'
                        : '#f7ad19',
                    trailColor: 'transparent',
                    textSize: '20px',
                  })}
                  text={
                    data?.vote_average != null
                      ? data.vote_average.toFixed(1)
                      : ''
                  }
                />
              </div>

              <div
                className="video_button"
                onClick={() => {
                  handleToggle()
                  setVideoID(video?.data?.results?.[0]?.key || '')
                }}
              >
                {video?.data?.results?.[0] && (
                  <PlayIcon className="videoButton" />
                )}
              </div>
            </div>

            <div className="overview">
              <h1>Overview</h1>
              <p>
                <span className="res">{data?.overview || ' '}</span>
              </p>
            </div>

            <div className="status">
              <p>
                Status: <span className="res">{data?.status || ' '}</span>
              </p>
              <p>
                Runtime:{' '}
                <span className="res">
                  {data?.runtime
                    ? toHoursAndMinutes(data.runtime)
                    : ' '}
                </span>
              </p>
              <p>
                Release Date:{' '}
                <span className="res">
                  {data?.release_date
                    ? dayjs(data.release_date).format('MMM D, YYYY')
                    : ' '}
                </span>
              </p>
            </div>

            <div className="director">
              <p>
                Director:{' '}
                <span className="res">
                  {credits?.data?.crew
                    ?.filter((x) => x.job === 'Director')
                    .map((x, i) => (
                      <React.Fragment key={x.id}>
                        {i > 0 ? ', ' : ''}
                        {x.name}
                      </React.Fragment>
                    )) || ' '}
                </span>
              </p>
            </div>

            <div className="writer">
              <p>
                Writer:{' '}
                <span className="res">
                  {credits?.data?.crew
                    ?.filter(
                      (x) =>
                        x.job === 'Screenplay' ||
                        x.job === 'Story' ||
                        x.job === 'Writer'
                    )
                    .map((y, i) => (
                      <React.Fragment key={y.id}>
                        {i > 0 ? ', ' : ''}
                        {y.name}
                      </React.Fragment>
                    )) || ' '}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="openAI">
        <h6>
          Viewers Sentiment Analysis{' '}
          <span style={{ color: '#fe5555' }}>(by ChatGPT)</span>
        </h6>

        {UsersApiKey ? (
          <ChatbotApp prompt={title} />
        ) : (
          <form className="form" onSubmit={submitAPIKey}>
            <div className="input">
              <label htmlFor="api-key">API Key:</label>
              <input
                id="api-key"
                type="text"
                value={apiInput}
                onChange={(e) => setApiInput(e.target.value)}
                placeholder="Paste your API Key here"
                required
              />
              <button type="submit">Submit</button>
            </div>
            {apiErr && (
              <span
                style={{
                  width: '100%',
                  display: 'block',
                  textAlign: 'center',
                  color: 'red',
                }}
              >
                {apiErr}
              </span>
            )}
            <div className="instructions">{/* instructions unchanged */}</div>
          </form>
        )}

        <div id="sentiment" />
      </div>

      {video?.data?.results?.length > 0 && (
        <div className="videos_container">
          <h6 className="videos_heading">Related Videos</h6>
          <div className="videos">
            {video.data.results.map((x) => (
              <div
                className="video"
                key={x.id}
                onClick={() => {
                  handleToggle()
                  setVideoID(x.key)
                }}
              >
                <img
                  src={`https://img.youtube.com/vi/${x.key}/mqdefault.jpg`}
                  alt="Video thumbnail"
                />
                <PlayIcon className="videoButton" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="casts_container">
        <h5>Top Casts</h5>
        <div className="casts">
          {credits?.data?.cast?.map((x) => (
            <div className="cast" key={x.id}>
              <div className="cast_img">
                <div className="xyz">
                  <Img url={x.profile_path} />
                </div>
              </div>
              <div className="cast_details">
                <h5>{x.name}</h5>
                <span className="res">{x.character}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {similarMovie?.data?.results?.length > 0 && (
        <div className="popular">
          <h6>Similar Movies</h6>
          <div className="cards">
            {similarMovie.data.results.map((result) => (
              <Card
                result={result}
                mediaType={mediaType}
                key={result.id}
              />
            ))}
          </div>
        </div>
      )}

      {recommendations?.data?.results?.length > 0 && (
        <div className="Recommendations">
          <h6>Recommendations</h6>
          <div className="cards">
            {recommendations.data.results.map((result) => (
              <Card
                result={result}
                mediaType={mediaType}
                key={result.id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Details
