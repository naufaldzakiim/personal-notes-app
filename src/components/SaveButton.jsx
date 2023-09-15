import React from "react";
import PropTypes from "prop-types";
import { MdCheck } from "react-icons/md";

function SaveButton({ onSave }) {
  return (
    <button className="action" type="button" title="Simpan" onClick={() => onSave()}>
      <MdCheck />
    </button>
  );
}

SaveButton.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default SaveButton;