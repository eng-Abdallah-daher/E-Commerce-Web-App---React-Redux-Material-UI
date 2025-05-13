import React, { useEffect, useRef} from 'react';
import '../css/goods.css';
import { TweenMax } from 'gsap';
import ScrollMagic from 'scrollmagic';
import Navbar from './components/Navbar';
import '../css/products_Page.css';
import '../css/cart.css';
const Goods = () => {
    const chooseSuggest = idx => {
        window.location.href = `/products?id=${idx}`;
    };
    const heroRef = useRef(null);
    const imageRef = useRef(null);
    const wrapperRef = useRef(null);
    const laptopSectionRef = useRef(null);
    useEffect(() => {
        const controller = new ScrollMagic.Controller();
        if (heroRef.current) {
            new ScrollMagic.Scene({
                triggerElement: heroRef.current,
                triggerHook: 0.5,
                duration: "50%"
            })
                .setTween(TweenMax.to(heroRef.current.querySelector('h1'), 1, { opacity: 1, y: -20 }))
                .addTo(controller);
        }
        if (imageRef.current && wrapperRef.current && laptopSectionRef.current) {
            const img = imageRef.current;
            const wrapper = wrapperRef.current;
            const section = laptopSectionRef.current;
            const maxShift = img.clientWidth - wrapper.clientWidth;
            new ScrollMagic.Scene({
                triggerElement: section,
                triggerHook: 0.5,
                duration: section.offsetHeight
            })
                .on("progress", (e) => {
                    img.style.transform = e.progress > 0.5
                        ? `translateX(-${maxShift}px)`
                        : `translateX(0)`;
                })
                .addTo(controller);
        }
        return () => controller.destroy();
    }, []);
    return (
        <>
          <Navbar chooseSuggest={chooseSuggest}/>
            <div className="hero" id="hero" ref={heroRef}>
                <h1 tabIndex="0">Experience Innovation</h1>
            </div>
            <div className="section" id="pre-laptop">
                <h2 tabIndex="0">Introducing Our Latest Innovation</h2>
                <p tabIndex="0">
                    Discover the design and engineering behind our most advanced device yet. Seamlessly blending
                    style and performance, every detail is crafted to perfection.
                </p>
            </div>
            <div className="section" id="laptop-section" ref={laptopSectionRef}>
                <p tabIndex="0">
                    Our latest laptop model combines power with portability. Its compact design and impressive specs
                    make it perfect for work and play.
                </p>
                <div className="laptop-wrapper" ref={wrapperRef}>
                    <img
                        id="scroll-image"
                        className="laptop-content"
                        src="images/laptop2images-removebg-preview.png"
                        alt="Laptop Image"
                        tabIndex="0"
                        ref={imageRef}
                    />
                </div>
                <p tabIndex="0">
                    Keep scrolling to learn more about its innovative features and design excellence.
                </p>
            </div>
            <div className="section" id="post-laptop">
                <h2 tabIndex="0">Advanced Features and Benefits</h2>
                <p tabIndex="0">
                    Delve into the details of our cutting-edge technology and discover the benefits that set this
                    product apart from the rest.
                </p>
            </div>
            <div className="section" id="featured-products">
                <h2 tabIndex="0">Featured Products</h2>
                <p tabIndex="0">
                    Explore our collection of high-quality products designed with innovation and style in mind.
                </p>
            </div>
        </>
    );
};
export default Goods;
