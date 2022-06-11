import { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";
import { Client } from "@petfinder/petfinder-js";

const client = new Client({
  apiKey: "oShvE21Gc1tMh5XOj4Gd0GkK0QZKkwP2UGm2cGusZRCbeUEblL",
  secret: "F81fM4hRyVqSNBY6Azp8RNJ2gefl5pZBM25Ewllw",
});

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    client.animal.show(this.props.params.id).then((resp) => {
      console.log(resp);
      this.setState(Object.assign({ loading: false }, resp.data.animal));
    });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    if (this.state.loading) {
      return <h2>loading...</h2>;
    }

    const {
      type,
      breeds,
      description,
      name,
      photos,
      gender,
      age,
      organization_id,
      url,
      showModal,
    } = this.state;

    return (
      <div className="details">
        <Carousel images={photos} />
        <div>
          <h1>{name.toUpperCase()}</h1>
          <h2>
            {type} - {breeds.primary} - {gender} - {age} -{" "}
            {organization_id.substring(0, 2)}
          </h2>
          <p>{description}</p>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <a href={url}>Yes</a>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const WrappedDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundary>
      <Details params={params} />;
    </ErrorBoundary>
  );
};

export default WrappedDetails;
