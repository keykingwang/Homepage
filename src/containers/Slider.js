import React from 'react';
import './Slider.css';
import styled from 'styled-components';
import LEFT_ARROW_URL from '../assets/images/left-arrow.svg';
import RIGHT_ARROW_URL from '../assets/images/right-arrow.svg';

class Slider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trueImages: [],
      images: [],
      imagesUrls: [],
      currentIndex: 0,
      translateValue: 0
    }
  }

  componentDidMount() {
    const { interval, images } = this.props;
    this.setState({
      images: images,
      trueImages: images
    })
    setInterval(() => this.goToNextSlide(), interval * 1000);
  }

  goToPrevSlide = () => {
    if (this.state.currentIndex === 0)
      return;

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue + this.slideWidth()
    }))
  }

  goToNextSlide = () => {
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue + -(this.slideWidth()),
      images: this.state.images.concat(this.state.trueImages)
    }));
  }

  slideWidth = () => {
    const slide = document.querySelector('.slide');
    if (slide) {
      return slide.clientWidth;
    } else {
      return 0;
    }
  }

  render() {
    return (
      <div className="slider">
        <div className="slider-wrapper"
          style={{
            transform: `translateX(${this.state.translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}>
          {
            this.state.images.map(({ url, description }, index) => (
              <Slide key={index} image={url} description={description} />
            ))
          }
        </div>

        <LeftArrow
          goToPrevSlide={this.goToPrevSlide}
        />

        <RightArrow
          goToNextSlide={this.goToNextSlide}
        />
      </div>
    );
  }
}

const Slide = ({ image, description }) => {
  const styles = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat'
  }
  return (
    <React.Fragment>
      <div className="slide" style={styles}>
      {description ? <SDescriptions>{description}</SDescriptions> : undefined}
      </div>
    </React.Fragment>
  );
}

const SDescriptions = styled.div`
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  color: #666666;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  @media (max-width: 450px) {
    font-size: 10px;
    bottom: 0;
  }
`;

const LeftArrow = (props) => {
  const styles = {
    opacity: 0.4,
    marginLeft: -3
  }
  return (
    <div className="backArrow arrow" onClick={props.goToPrevSlide}>
      <img src={LEFT_ARROW_URL} style={styles} alt="left" />
    </div>
  );
}


const RightArrow = (props) => {
  const styles = {
    opacity: 0.4,
    marginRight: -3
  }
  return (
    <div className="nextArrow arrow" onClick={props.goToNextSlide}>
      <img src={RIGHT_ARROW_URL} style={styles} alt="right" />
    </div>
  );
}

export default Slider;