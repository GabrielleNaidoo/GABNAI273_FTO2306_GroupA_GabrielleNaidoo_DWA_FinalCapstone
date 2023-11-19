

function Test(){
  fetch("https://podcast-api.netlify.app/id/10716")
  .then((res) => res.json())
  .then(data => console.log(data))
}

Test();

//https://podcast-api.netlify.app/id/10716

//https://podcast-api.netlify.app/shows