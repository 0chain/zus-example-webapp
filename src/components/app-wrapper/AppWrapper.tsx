import { useEffect } from "react";
import PropTypes from "prop-types";
import { init } from "@zerochain/zus-sdk";

import { config } from "constant/config";

const AppWrapper = ({ children }) => {
  useEffect(() => {
    const initializeApp = async () => await init(config);

    initializeApp();
  }, []);

  return <>{children}</>;
};

AppWrapper.propTypes = { children: PropTypes.any };

export default AppWrapper;
