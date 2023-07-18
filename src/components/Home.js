import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div className="main-content">
                <img src="./images/index_image.jpg" id="mainImg" alt="camping" width="500" />
                <hr />
                <h2 className="subtitle">Everything you need for camping</h2>
                <div className="table">
                    <div className="row">
                        <span><img src="./images/Tents_index.jpg" alt="Tents" width="150" height="150" /></span>
                        <span><img src="./images/sleeping-bags_index.jpg" alt="Sleeping Bags" width="150" height="150" /></span>
                        <span><img src="./images/cooking_utensils_index.jpg" alt="Cooking Utensils" width="150" height="150" /></span>
                    </div>
                    <div className="row">
                        <span>Tents</span>
                        <span>Sleeping Bags</span>
                        <span>Cooking Utensils</span>
                    </div>
                </div>
                <h2 className="subtitle">Popularity Items</h2>
                <div className="table">
                    <div className="row">
                        <span><img src="./images/index_image.jpg" alt="Tents" width="150" /></span>
                        <span><img src="./images/index_image.jpg" alt="Sleeping Bags" width="150" /></span>
                        <span><img src="./images/index_image.jpg" alt="Cooking Utensils" width="150" /></span>
                    </div>
                    <div className="row">
                        <span>Tents</span>
                        <span>Sleeping Bags</span>
                        <span>Cooking Utensils</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;