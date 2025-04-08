import { ClipLoader } from "react-spinners";

const Loader = () => {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}>
        <ClipLoader color="#4645F6" size={100} />
      </div>
    );
  };
  
  export default Loader;
  
