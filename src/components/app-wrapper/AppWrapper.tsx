import PropTypes from "prop-types";

const AppWrapper = ({ children }) => {
  return <>{children}</>;
};

AppWrapper.propTypes = { children: PropTypes.any };

export default AppWrapper;
