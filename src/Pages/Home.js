import React from 'react';
import Showcase2 from '../Components/Showcase2';
import Slider from '../Components/Slider';
import Title from '../Components/Title';
// import Services from './Services';
import Services from '../Components/Services/Services';
import Showcase3 from '../Components/Showcase3';
import MyReview from '../Components/MyReview';
// import Products from './Products';
// import Services from '../Components/Services/Services';


const Home = () => {
    return (
        // min-h[calc(100vh - ]
        <div className=''>
            <Slider></Slider>
            <Title></Title>
            <Showcase2></Showcase2>
            <Services item={false}></Services>
            <Showcase3></Showcase3>
            <MyReview></MyReview>
        </div>
    );
};

export default Home;