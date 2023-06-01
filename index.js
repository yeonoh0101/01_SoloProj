const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTFlMmI0N2U0M2EyYThkNWFmOThmM2VhZmM4NzY4NCIsInN1YiI6IjY0NzA5MGMxMzM2ZTAxMDBjNzA3OWI2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ak-O3QOWvrauNZOb9V1MjrZCCOxtlIr_FCwHNe8FILo",
  },
}; // fetch요청을 할 때 필요한 객체의 값들을 일일이 넣는 것은 보기 불편하니 options라는 상수에 할당한다.

function MovieList(searchTerm = "") {
  // MovieList라는 함수를 선언하고 'searchTerm'이라는 매개변수를 받는다.('searchTerm'은 검색어로 사용이 되는데 기본값은 빈 문자열이다.)
  let element = document.querySelector("#cards"); // html 코드에서 id가 cards인 요소를 찾아 element라는 변수에 할당한다.
  element.innerHTML = ""; // element에 담긴 요소들의 내용을 비웁니다.

  let apiUrl =
    "https://api.themoviedb.org/3/movie/top_rated?language=-US&page=1"; // apiUrl이라는 변수에 TMDB api주소를 할당한다.

  if (searchTerm !== "") {
    // if조건문을 사용해 검색어가 빈 내용이 아닌경우라면!
    fetch(apiUrl, options) // fetch 함수를 사용해서 데이터를 가져오기위해 위에 선언한 apiUrl, options를 넣어 요청을 보낸다.
      .then((response) => response.json())
      .then((data) => {
        // 받아온 데이터를 json형식으로 변환해 data에 넣는다.
        let rows = data["results"]; // rows라는 변수에 data안에 있는 객체의 key값인 results의 value값들을 할당한다.
        let filteredRows = rows.filter(
          // rows 배열의 filter 함수를 호출한다.콜백함수를 인자로 받는다.
          (
            item // 인자로 받은 데이터 중에 if조건에 해당하는 데이터들만 새로운 배열에 포함된다.
          ) =>
            item.original_title.toLowerCase().includes(searchTerm.toLowerCase()) // item.original_title(새로운 배열로 들어간 데이터들의 origin_title)을 소문자로 반환하고
        ); //  serchTerm에 들어온 original_title도 소문자로 바꿔 서로 같은 문자열들만(includes() 메서드로 문자열이 다른 문자열에 포함되어 있는지 여부를 확인) filteredRows에 할당한다.

        filteredRows.forEach((item) => {
          // forEach() 메서드로 filteredRows의 배열 요소들을 하나씩 반복돌린다.
          let movieid = item["id"];
          let moviename = item["original_title"];
          let movieov = item["overview"];
          let movieimg = item["poster_path"];
          let moviestar = item["vote_average"]; // 각 변수에다 item에 있는 데이터중 영화 id, 이름, 영화 소개, 사진, 별점이름을 각각 할당한다.

          let temp_html = `<div class="col">
                              <div class="zkem">
                                <img a href="" onclick="alert('ID : '+ ${movieid})" src="https://image.tmdb.org/t/p/w500/${movieimg}"></a> 
                                <div class="card-body">
                                  <h5 class="card-title">${moviename}</h5>
                                  <p class="card-text">${movieov}</p>
                                  <p>${moviestar}</p>
                                </div>
                              </div>
                            </div>`; // temp_html이란 변수에 템플릿 리터럴로 <div>박스시작부터 끝까지의 내용을 문자열로 담고 변수들을 각각 위치에 넣는다.
          // onclick 이벤트를 사용하여 img를 누르면 alert창에 ID : (movieid값)이 나온다.

          let cardContainer = document.createElement("div"); // 새로운 <div>를 만들어 cardContainer에 할당한다.
          cardContainer.innerHTML = temp_html; // temp_html에 저장된 영화 데이터가 담긴 html코드를 cardContainer내부 html에다 할당한다.
          element.appendChild(cardContainer.firstChild); // cardcontainer의 첫 번째 자식요소를 element요소의 자식으로 추가해 temp_html에 담긴 영화카드가 웹페이지의 추가된다.
        });
      });
  } else {
    // 검색어가 빈 내용이라면
    fetch(apiUrl, options) // 똑같이 fetch함수로 apiUrl과 options를 넣어 요청한다.
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        let rows = data["results"];
        // console.log(rows);

        rows.forEach((item) => {
          let movieid = item["id"];
          let moviename = item["original_title"];
          let movieov = item["overview"];
          let movieimg = item["poster_path"];
          let moviestar = item["vote_average"];

          let temp_html = `<div class="col">
                              <div class="zkem">
                                <img a href="" onclick="alert('ID : '+ ${movieid})" src="https://image.tmdb.org/t/p/w500/${movieimg}"></a>
                                <div class="card-body">
                                  <h5 class="card-title">${moviename}</h5>
                                  <p class="card-text">${movieov}</p>
                                  <p>${moviestar}</p>
                                </div>
                              </div>
                            </div>`;

          let cardContainer = document.createElement("div");
          cardContainer.innerHTML = temp_html;
          element.appendChild(cardContainer.firstChild);
        });
      });
  }
} // 위와 똑같이 영화 데이터 들어간 카드들을 웹페이지에다 보여주는데 다른점은 filter함수 호출없이 모든 영화를 웹페이지에 보여준다.

MovieList(); // 페이지 로드 시 MovieList함수를 호출하여 영화 데이터를 가져온다.

// 아래 코드들은 검색 버튼을 눌러 검색했을때 영화 목록을 보여주는 MovieList함수를 호출해 조건에 맞는 영화데이터를 보여주는 코드이다.
const searchInput = document.getElementById("search"); // getElementById() 함수를 사용하여 id값이 search인 요소를 searchInput이란 상수에 할당한다.(검색어를 입력하는 <input>요소를 가리킨다.)
const searchBtn = document.getElementById("searchBtn"); // getElementById() 함수를 사용하여 id값이 searchBtn인 요소를 searchBtn이란 상수에 할당한다.(검색 버튼을 가리킨다.)

searchBtn.addEventListener("click", (e) => {
  // 검색 버튼을 눌렀을때 이벤트가 실행된다.e를 매개변수로 받는다.
  e.preventDefault(); // preventDefault 메소드를 사용해 검색 버튼 클릭시 페이지가 다시 로드되는 동작을 막는다.
  const val = searchInput.value; // 검색창에 입력된 것을 가져와 val이라는 상수에 할당해준다.
  MovieList(val); // MovieList 함수를 호출하는데 val(사용자가 검색한 것)을 인자로 받아 위 if else 조건에 해당하는 값으로 영화를 보여준다.
});

function Title() {
  // html <hi>태그에 있는 문자를 클릭해서 Title()함수를 호출해 페이지 새로고침이 실행된다.
  window.location.reload();
}
