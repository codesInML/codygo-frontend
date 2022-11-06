import axios from "axios";

export default axios.create({
  baseURL: "https://codygo-backend-production.up.railway.app/api/v1",
});
