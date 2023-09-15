import React from "react";
import PropTypes from "prop-types";
import { MdAdd } from "react-icons/md";

function AddButton({ onAdd }) {
  return (
    <button className="action" type="button" title="Tambah" onClick={() => onAdd()}>
      <MdAdd />
    </button>
  );
}

AddButton.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddButton;