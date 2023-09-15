import React from "react";
import PropTypes from "prop-types";
import NoteDetail from "../components/NoteDetail";
import UnarchiveButton from "../components/UnarchiveButton";
import ArchiveButton from "../components/ArchiveButton";
import DeleteButton from "../components/DeleteButton";
import NotFoundPage from "./NotFoundPage";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils/network-data";
import { showFormattedDate } from "../utils";

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <DetailPage id={id} navigate={navigate} />
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: undefined,
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
  }

  componentDidMount() {
    const fetchNote = async () => {
      const { data } = await getNote(this.props.id);
      this.setState({ note: data });
    };
    fetchNote();
  }

  async onDeleteHandler(id) {
    await deleteNote(id);
    this.props.navigate('/');
  }

  async onArchiveHandler(id) {
    await archiveNote(id);
    this.props.navigate('/');
  }

  async onUnarchiveHandler(id) {
    await unarchiveNote(id);
    this.props.navigate('/');
  }

  render() {
    if (this.state.note === undefined) {
      return <NotFoundPage />
    }

    return (
      <section className="detail-page">
        <NoteDetail title={this.state.note.title} createdAt={showFormattedDate(this.state.note.createdAt)} body={this.state.note.body} />
        <div className="detail-page__action">
          {this.state.note.archived ? <UnarchiveButton id={this.state.note.id} onUnarchive={this.onUnarchiveHandler} /> : <ArchiveButton id={this.state.note.id} onArchive={this.onArchiveHandler} />}
          <DeleteButton id={this.state.note.id} onDelete={this.onDeleteHandler}/>
        </div>
      </section>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default DetailPageWrapper;