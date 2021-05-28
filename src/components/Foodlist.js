import React from "react";
import PropTypes from "prop-types";
import "./Foodlist.css";

//img의 alt와 title은 사진에 마우스 올렸을 때 나오는 제목 표시하기 위함
//css를 하기 위해서 style={{}}를 사용할 수 있다.
function Foodlist({ id, year, title, summary, poster, genres }) {
  return (
    <Link
      to={{
        pathname: `/movie/${id}`,
        state: {
          year,
          title,
          summary,
          poster,
          genres,
        },
      }}
    >
      <div className="movie">
        <img src={poster} alt={title} title={title} />
        <div className="movie__data">
          <h3 className="movie__title">{title}</h3>
          <h5 className="movie__year">{year}</h5>
          <ul className="movie__genres">
            {genres.map((genre, index) => (
              //map은 (현재값, 인덱스) 두개의 아규먼트를 넘김
              //key값이 없으면 오류가 나기때문에 index로 key를 만들어서 제공한다
              <li key={index} className="genres__genre">
                {genre}
              </li>
            ))}
          </ul>
          <p className="movie__summary">{summary.slice(0, 180) + "..."}</p>
        </div>
      </div>
    </Link>
  );
}

Foodlist.propTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Foodlist;
