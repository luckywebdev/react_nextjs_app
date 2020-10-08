import React, {useState} from 'react';
// import { getProductsById } from '../../../store/product/action';
import ReactCursorPosition from 'react-cursor-position';
import Tooltip from '../../../components/elements/Tooltip';

import productAll from '../../../public/static/data/product.json';

const productImage = '/static/uploads/tagTestImage.png';
const ShopCategories = () => (
    <div className="ps-shop-categories">
        <div className="d-flex justify-content-center align-content-lg-stretch">
          <ReactCursorPosition>
            <PositionLabel />
          </ReactCursorPosition>
        </div>
    </div>
);
const PositionLabel = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [detailView, setDetailView] = useState(false);
  const [tooltipPos, setTooltipPos] = useState([0, 0]);

  // const dispatch = useDispatch();
  // const state = useSelector(state => state.product, shallowEqual);
  const {
    detectedEnvironment: {
      isMouseDetected = false,
      isTouchDetected = false
    } = {},
    elementDimensions: {
      width = 0,
      height = 0
    } = {},
    isActive = false,
    isPositionOutside = false,
    position: {
      x = 0,
      y = 0
    } = {}
  } = props;

  const DetailView = () => {
    setDetailView(!detailView);
  }

  const ShowTooltipChange = () => {
    const item = isInside(x, y);
    if(item.length === 1){
      setTooltipPos([item[0].rect[0] + item[0].rect[2] / 2, item[0].rect[1] + item[0].rect[3] / 2]);
      const summary = (
        <div className="d-flex flex-column">
          <div className="d-flex flex-row align-items-center justify-content-start mb-2" onClick={DetailView}>
            <img src={item[0].icon} width="20" height="25" alt="product icon"/>
            <span className="ml-2">{item[0].title !== null ? item[0].title : ''}</span>
          </div>
          <div className="divideLine mb-2" style={{display: detailView ? 'flex' : 'none'}}></div>
          <div className="flex-column justify-content-start" style={{display: detailView ? 'flex' : 'none', color: '#FFF'}}>
            <p style={{color: "#FFF"}}>Price: ${item[0].price}</p>
            <p style={{color: "#FFF"}}>Vendor: {item[0].vendor}</p>
            <p style={{color: "#FFF"}}>{(item[0].is_active) ? "Active" : "Inactive"}</p>
          </div>
        </div>    
      );
      setTooltipContent(summary);
      setShowTooltip(true);
    }
    else{
      setShowTooltip(false);
      setDetailView(false);
    }
  }

  const TooltipShowChange = () => {
    setShowTooltip(true);
    setDetailView(true);
  }
  
  const DestroyTooltip = () => {
    setShowTooltip(false);
    setDetailView(false);
  }

  const DetailContentView = () => {
    setDetailView(false);
  }
  const isInside=(x, y) =>{
    const filteredProduct = productAll.relatedProduct.filter((item) => {
      let rect = item.rect;
      if( rect[0] < x && rect[1] < y && rect[0] + rect[2] > x && rect[1] + rect[3] > y ){
        return item;
      }
    });
    return filteredProduct;
  }
  return (
    <div className="product__tagable" onMouseMoveCapture={ShowTooltipChange} onMouseLeave={DestroyTooltip}>
      <img src={ productImage } alt="productImgae" />
      <Tooltip placement="top" showTooltip={showTooltip} content={tooltipContent} x={tooltipPos[0]} y={tooltipPos[1]} mouseCapture={TooltipShowChange} detailView={DetailContentView}/>
    </div>
  );
};
export default ShopCategories;
