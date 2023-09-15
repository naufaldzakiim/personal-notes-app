import React from "react";
import PropTypes from "prop-types";
import SaveButton from "../components/SaveButton";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";

function AddNewPageWrapper() {
  const navigate = useNavigate();
  return <AddNewPage navigate={navigate} />
}

class AddNewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    }

    this.onNameChangeHandler = this.onNameChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSaveHandler = this.onSaveHandler.bind(this);
  }

  onNameChangeHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      }
    });
  }

  onBodyChangeHandler(event) {
    this.setState(() => {
      return {
        body: event.target.innerHTML,
      }
    });
  }

  async onSaveHandler() {    
    await addNote(this.state);
    this.props.navigate('/');
  }

  render() {
    return(
      <section className="add-new-page">
        <div className="add-new-page__input">
          <input
            type="text"
            className="add-new-page__input__title"
            placeholder="Catatan rahasia"
            value={this.state.title}
            onChange={this.onNameChangeHandler}
          />
          
          <div
            className="add-new-page__input__body"
            data-placeholder="Sebenarnya saya adalah ...."
            contentEditable
            value={this.state.body}
            onInput={this.onBodyChangeHandler}
          />
        </div>
        <div className="add-new-page__action">
          <SaveButton onSave={this.onSaveHandler} />
        </div>
      </section>
    );
  }
}

AddNewPage.propTypes = {
  navigate: PropTypes.func.isRequired,
}

export default AddNewPageWrapper;