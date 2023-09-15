import React from "react";
import PropTypes from "prop-types";
import { RiInboxUnarchiveLine } from "react-icons/ri";

function UnarchiveButton({ id, onUnarchive}) {
  return (
    <button className="action" type="button" title="Aktifkan" onClick={() => onUnarchive(id)}>
      <RiInboxUnarchiveLine />
    </button>
  );
}

UnarchiveButton.propTypes = {
  id: PropTypes.string.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default UnarchiveButton;