import React, { useEffect, useState } from 'react';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  // State to track if footer should be shown or hidden
  const [showFooter, setShowFooter] = useState(true);

  // Function to handle scroll event
  const handleScroll = () => {
    // Calculate how far the user has scrolled from the top
    const scrollY = window.scrollY || window.pageYOffset;
    // Calculate the height of the viewport
    const viewportHeight = window.innerHeight;
    // Calculate the height of the entire document
    const totalHeight = document.documentElement.scrollHeight;

    // Check if the user has scrolled to the bottom of the page
    if (scrollY + viewportHeight >= totalHeight) {
      // If scrolled to the bottom, show the footer
      setShowFooter(true);
    } else {
      // If not scrolled to the bottom, hide the footer
      setShowFooter(false);
    }
  };

  // Add scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer id="footer" className={`footer ${showFooter ? '' : 'hide'}`}>
      <div>
        <div className="row">
          <div className="col-md-6">
            <p className='mx-3 my-3'>&copy; Glow Girl 2024 All rights reserved</p>
          </div>
          <div className="col-md-6">
            <div className="social-icons my-3">
              <FaInstagram className="social-icon" />
              <FaFacebook className="social-icon" />
              <FaTiktok className="social-icon" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
