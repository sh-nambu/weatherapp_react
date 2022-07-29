import { useParams } from "react-router-dom";

export const Weather: React.FC = () => {
  const params = useParams();

  return (
    <>
      <div>Weather</div>
      <div>{params.city}</div>
    </>
  );
};

export default Weather;
