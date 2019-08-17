import React from 'react';
import GifCard from '../GifCard';
import GifModalWindow from '../GifModalWindow';
import NoMoreGifs from '../NoMoreGifs';
import giphyRequest from '../../http/giphyRequest';
import constants from '../../constants';
import key from 'weak-key';
import Masonry from 'react-masonry-component';
import './GifContainer.scss';


export default class GifContainer extends React.PureComponent {

  state = {
    searchData: [],
    modalInfo: null,
    isContentOver: false,
  }
  
  constructor(props) {
    super(props);
    this.giphyOffset = 0;
  }

  componentDidMount() {
    const { searchRequest, isGettingData } = this.props;

    if(searchRequest && !isGettingData){
      this.getData(searchRequest)
          .then(data => this.setState({ searchData: data.data}));
    }
  }

  getData = async (request) => {
    const { isContentOver } = this.state;
    const { isGettingData, toggleGettingData, maxCount, ratingValue } = this.props;
    let data; 

    if(isGettingData || isContentOver ) return;

    const x = maxCount - this.giphyOffset;

    if(x <= 0){
      this.setState({ isContentOver: true });
      return;
    }

    const chunkSize = Math.min(constants.dataChunkSize, x);


    const url = `${ constants.giphyDomain }.${request}&api_key=${ constants.APIKey }&limit=${ chunkSize }&offset=${ this.giphyOffset }&rating=${ratingValue}`;

    toggleGettingData();

    data = await giphyRequest(url);
    
    toggleGettingData();

    this.giphyOffset += chunkSize;

    return data;
  }

  extractData(data) {
    const { title, images, import_datetime, source, images: {preview_gif: { width, height }}, rating } = data;

    return {
      height,
      width,
      title,
      images,
      import_datetime,
      source,
      rating,
    }
  }

  handleClick = (event) => {
    const { searchData } = this.state;
    const gifId = +event.target.getAttribute('data-id');


    if (gifId) {
      this.setState({ modalInfo: searchData[ gifId ] });
    }
  }

  handleScroll = async (event) => {
    const { searchRequest, isGettingData } = this.props;
    const { searchData } = this.state;
    const slider = event.target;
    const topOffset = slider.scrollHeight - slider.scrollTop;
    const scrHeight = document.documentElement.clientHeight;

    if (topOffset < scrHeight * 2 && !isGettingData) {
      const newData = await this.getData(searchRequest);
      if(!newData) return;
      this.setState({ searchData: searchData.concat(newData.data) });
    }
  }

  handleModalClose = () => {
    this.setState({ modalInfo: null });
  }

  render() {
    const { modalInfo, searchData, isContentOver } = this.state;
    const { gifWidth } = this.props;

    return (
      <div
        className="gif-container"
        onClick={ this.handleClick }
        onScroll={ this.handleScroll }
      >
        <Masonry
          className={'my-gallery-class'}
          elementType={'ul'}
          options={{ transitionDuration: 1 }}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
          imagesLoadedOptions={ { display: 'none' } }
        >   
          {searchData.map((data, i) =>  
              <li key={key(data)} >
                <GifCard
                  gifWidth={gifWidth}
                  data={this.extractData(data)} 
                  id={i} />
              </li> )
          }
        </Masonry>
    
        { isContentOver && <NoMoreGifs />}

        { !!modalInfo &&
          <GifModalWindow
            open={ !!modalInfo }
            onClose={ this.handleModalClose }
            modalInfo={ this.extractData(modalInfo) }
          />
        }
      </div>
    )
  }
}

