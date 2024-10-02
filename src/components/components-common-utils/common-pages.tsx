import React from "react";
import "../../components-styles/loading-page.css";
import "../../components-styles/error-page.css";

interface ILoadingPage {
  message?: string;
}
interface IErrorPage {
  message?: string;
}

export const LoadingPage: React.FC<ILoadingPage> = ({
  message = "Loading...",
}) => {
  return (
    <div className="loading-container">
      <div className="orbiting-atom">
        <div className="electron electron1"></div>
        <div className="electron electron2"></div>
        <div className="electron electron3"></div>
      </div>
      <p>{message}</p>
    </div>
  );
};

export const ErrorPage: React.FC<IErrorPage> = ({
  message = "Something went wrong, Please try again",
}) => {
  return (
    <div className="error-container" style={{ backgroundColor: "#121212" }}>
      <div className="error-icon">🚫</div>
      <h1>Oops!</h1>
      <p>{message}</p>
      <div className="button-container">
        <button
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
        <div className="electron-animation"></div>
      </div>
    </div>
  );
};
