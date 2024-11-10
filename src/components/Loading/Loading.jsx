import { Oval } from "react-loader-spinner";
import css from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={css.loader}>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
export default Loading;
