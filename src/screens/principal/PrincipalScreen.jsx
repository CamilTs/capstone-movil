import { useEffect } from "react";
import { Tab } from "../../components";
import { useSelector } from "react-redux";

export const PrincipalScreen = () => {
  const { rut, token } = useSelector((state) => state.auth);

  useEffect(() => {}, []);
  return <Tab />;
};
