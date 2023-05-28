import axios from "axios";

async function postLogin(email, password) {
  const options = {
    method: "POST",
    url: "http://localhost:3000/user/login",
    data: { email: email, password: password },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (e) {
    return {
      message: e.response.data.error,
    };
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  postLogin,
};
