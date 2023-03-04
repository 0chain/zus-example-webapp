import PropTypes from "prop-types";
import clsx from "clsx";

import stl from "./ActionButton.module.scss";

const ActionButton = ({ id, buttonLabel, type, onClick, disabled }) => {
  return (
    <button
      id={id}
      className={clsx(
        type === "secondary" ? stl.buttonSecondary : stl.buttonPrimary
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={stl.textStyle}>
        <span>{buttonLabel}</span>
      </div>
    </button>
  );
};

ActionButton.propTypes = {
  id: PropTypes.string,
  buttonLabel: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

export default ActionButton;
