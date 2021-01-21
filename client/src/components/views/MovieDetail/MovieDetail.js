import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../commons/GridCards";
import Favorite from "./Sections/Favorite";
import { Row, Button } from "antd";

function MovieDetail(props) {
    let movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState(null);
    const [Casts, setCasts] = useState(null);
    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko-KR`;
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;

        fetch(endpointInfo)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setMovie(res);
            });

        fetch(endpointCrew)
            .then((res) => res.json())
            .then((res) => {
                console.log("res for Crew", res);
                setCasts(res.cast);
            });
    }, []);

    const onToggleActorView = () => {
        setActorToggle(!ActorToggle);
    };
    return (
        <div>
            {/* Header */}
            {Movie && (
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            )}

            {/* body */}

            <div style={{ width: "85%", margin: "1rem auto" }}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    {Movie && (
                        <Favorite
                            movieInfo={Movie}
                            movieId={movieId}
                            userFrom={localStorage.getItem("userId")}
                        />
                    )}
                </div>
                {/* Movie Info */}
                <MovieInfo movie={Movie} />
                <br />
                {/* Actor Grid */}
                <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
                    <Button onClick={onToggleActorView}> Toggle Actor View </Button>
                </div>
                {ActorToggle && (
                    <Row gutter={[16, 16]}>
                        {Casts &&
                            Casts.map((cast, index) => (
                                <React.Fragment key={index}>
                                    <GridCards
                                        image={
                                            cast.profile_path
                                                ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                                                : "https://lh3.googleusercontent.com/proxy/-0lP42Z1Y9V92xT_JIxXA7aqvf0vrZNZ3wEvVsxGQ4aAuZEiyp-grLLZESb5bhwbJd9zuwkvk4P46RRpwAPzdQbx1xu67IZ7EttPb039Cfg7JQ3_ef6THGF9hJpbbNfFkJhXs7MBCa_lSB0HoDIFf4iBXTHHbW5edyeyz4vfoBgmCRXMJCRfrXz6Mc8zGKikq865zJhzz1qokBSmU92F7GG5pFiduxw3YdBV8xwdCnhp43r-bJll3CmpYxKrPYxsxMdD3chZsVM0nEjFj1SHBK533luhyTjrOomkzR8k8SAsgNAUEhyaGedtlNE2OaKajMiR2_ZVTdsrbFf8UnQ"
                                        }
                                        characterName={cast.name}
                                    />
                                </React.Fragment>
                            ))}
                    </Row>
                )}
            </div>
        </div>
    );
}

export default MovieDetail;
