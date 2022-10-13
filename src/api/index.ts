import axios from "axios";

export const getDataAPI = () =>
  axios.get(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
  );
