import axios from "axios"

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({"published":true});

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

export default axios.create({
  baseURL: "http://localhost:9000/api",
  requestOptions,
})
