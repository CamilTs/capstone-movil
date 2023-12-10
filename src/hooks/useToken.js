import { useDispatch, useSelector } from "react-redux";

export const useToken = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const checkAuthToken = () => {
    try {
      dispatch(revisando());

      // if (!token) return dispatch(logout({ errorMessage: null }));

      //   const res = await api.post(`verificarToken`, { token });
      //   console.log(res);
      //   dispatch(login({ ...res.data.data }));
    } catch (error) {
      //   dispatch(logout({ errorMessage: error.message }));
    }
  };
  return {};
};
