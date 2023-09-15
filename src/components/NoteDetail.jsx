import React from "react";
import PropTypes from "prop-types";
import parser from "html-react-parser";

function NoteDetail({ title, createdAt, body }) {
  return (
    <>
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{createdAt}</p>
      <div className="detail-page__body">{parser(body)}</div>
    </>
  );
}

NoteDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteDetail;