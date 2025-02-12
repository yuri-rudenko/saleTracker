import React from 'react';
import { ReactComponent as More } from '../../images/More.svg';

const Order = () => {
    return (
        <div>
            <div className="order">
                <div className="top">
                    <More className="more" />
                    <img src="https://ae-pic-a1.aliexpress-media.com/kf/S14219c43563043fea66f85f455add4d3Y.jpg_960x960q75.jpg_.avif" alt="Crunch" className='item-image' />
                </div>
                <div className="bottom">
                    <div className="char status">
                        <div className="char-text">Status: </div>
                        <div className="char-content">Done</div>
                    </div>
                    <div className="char items">
                        <div className="char-text">Items: </div>
                        <div className="inner-ites">
                            <div className="char-content item">Crunch Distortion (1)</div>
                            <div className="char-content item">Power cable (1)</div>
                        </div>
                    </div>
                    <div className="char amount">
                        <div className="char-text">Amount: </div>
                        <div className="char-content">2</div>
                    </div>
                    <div className="char price">
                        <div className="char-text">Price: </div>
                        <div className="char-content">789₴</div>
                    </div>
                    <div className="char margin">
                        <div className="char-text">Margin: </div>
                        <div className="char-content">350₴</div>
                    </div>
                    <div className="char type">
                        <div className="char-text">Type: </div>
                        <div className="char-content">OLX Ukr</div>
                    </div>
                    <div className="char date">
                        <div className="char-text">Date: </div>
                        <div className="char-content">1 day ago</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
