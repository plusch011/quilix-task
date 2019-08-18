import React from 'react';
import GifCard from '../GifCard';
import GifModalWindow from '../GifModalWindow';
import NoMoreGifs from '../NoMoreGifs';
import giphyRequest from '../../http/giphyRequest';
import constants from '../../constants';
import key from 'weak-key';
import Masonry from 'react-masonry-component';
import Loader from '../Loader';
import './GifContainer.scss';


export default class GifContainer extends React.Component {

  state = {
    searchData: [],
    modalInfo: null,
    isGettingData: false,
  }

  constructor(props) {
    super(props);
    this.giphyOffset = 0;
  }

  componentDidMount() {
    const { searchRequest } = this.props;

    if (searchRequest) {
      this.getData(searchRequest)
        .then(data => this.setState({ searchData: data }));
    }
  }

  toggleGettingData = () => {
    const { isGettingData } = this.state;
    if (isGettingData) {
      setTimeout(() => {
        this.setState({ isGettingData: !isGettingData })
      }, 700);
    } else {
      this.setState({ isGettingData: !isGettingData });
    }
  }

  getData = async (request) => {
    const { isGettingData } = this.state;
    const { maxCount, ratingValue } = this.props;

    if (isGettingData) return;

    const remainGifs = maxCount - this.giphyOffset;

    const chunkSize = Math.min(constants.dataChunkSize, remainGifs);
    const url = `${constants.giphyDomain}.${request}&api_key=${constants.APIKey}&limit=${chunkSize}&offset=${this.giphyOffset}&rating=${ratingValue}`;

    this.toggleGettingData();

    const data = await giphyRequest(url).catch( err => { console.log`Sorry we have problems ${err}`});

    this.toggleGettingData();

    this.giphyOffset += chunkSize;

    return this.extractData(data.data);
  }

  extractData(data) {
    return data.map(obj => {
      const { title, images, import_datetime, source, images: { preview_gif: { width, height } }, rating } = obj;

      return {
        height,
        width,
        title,
        images,
        import_datetime,
        source,
        rating,
      }
    });
  }

  handleClick = (event) => {
    const { searchData } = this.state;
    const gifId = +event.target.getAttribute('data-id');


    if (gifId) {
      this.setState({ modalInfo: searchData[gifId] });
    }
  }

  handleScroll = async (event) => {
    event.persist();
    const { searchRequest } = this.props;
    const { searchData } = this.state;
    const slider = event.target;
    const scrHeight = document.documentElement.clientHeight;

    if (slider.scrollHeight <= slider.scrollTop + scrHeight) {
      const newData = await this.getData(searchRequest);
      if (!newData) return;
      this.setState({ searchData: [...searchData, ...newData] });
    }
  }

  handleModalClose = () => {
    this.setState({ modalInfo: null });
  }

  render() {
    const { modalInfo, searchData, isContentOver, isGettingData } = this.state;

    return (
      <>
        {isGettingData && <Loader />}
        <div
          className="gif-container"
          onClick={this.handleClick}
          onScroll={this.handleScroll}
        >
          <Masonry
            className={'my-gallery-class'}
            elementType={'ul'}
            options={{ transitionDuration: 0 }}
            disableImagesLoaded={false}
            updateOnEachImageLoad={true}
            imagesLoadedOptions={{ display: 'none' }}
          >
            {searchData.map((data, i) =>
              <li key={key(data)} >
                <GifCard data={data} id={i} />
              </li>)
            }
          </Masonry>

          {!!modalInfo &&
            <GifModalWindow
              open={!!modalInfo}
              onClose={this.handleModalClose}
              modalInfo={modalInfo}
            />
          }
        </div>
      </>
    )
  }
}

