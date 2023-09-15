import React from "react";
import PropTypes from "prop-types";
import { RiInboxArchiveLine } from "react-icons/ri";

function ArchiveButton({ id, onArchive }) {
  return (
    <button className="action" type="button" title="Arsipkan" onClick={() => onArchive(id)}>
      <RiInboxArchiveLine />
    </button>
  );
}

ArchiveButton.propTypes = {
  id: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default ArchiveButton;