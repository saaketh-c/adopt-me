import { Component } from "react";

const petFinderLogo =
  "data:image/png;base64,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";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: [{ full: petFinderLogo }],
  };

  handleIndexClick = (event) => {
    this.setState({
      active: Number.parseInt(event.target.dataset.index),
    });
  };

  render() {
    const { active } = this.state;
    const images = this.props.images.length
      ? this.props.images
      : [
          {
            full: petFinderLogo,
          },
        ];

    return (
      <div className="carousel">
        <img src={images[active].full} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              onClick={this.handleIndexClick}
              key={photo.full}
              src={photo.full}
              data-index={index}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
