import { Link } from "react-router-dom";

const ErrorPage = ({ err }) => {
  if (!err) {
    return (
      <div className="error-page">
        <h1>Sorry!</h1>
        <h2 className="error-page-h2">That destination doesn't exist!</h2>
        <Link to="/">Homepage</Link>
      </div>
    );
  } else if (err.response.data.msg)
    return (
      <div className="error-page">
        <h1 className="error-page-h1">Sorry!</h1>
        <h2 h2 className="error-page-h2">
          {err.response.data.msg}
        </h2>
        <Link to="/">Homepage</Link>
      </div>
    );
  else
    return (
      <div className="error-page">
        <h1 assName="error-page-h1">Sorry!</h1>
        <h2 h2 className="error-page-h2">
          Something went wrong!
        </h2>
        <Link to="/">Homepage</Link>
      </div>
    );
};

export default ErrorPage;
