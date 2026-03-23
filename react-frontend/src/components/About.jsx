import "./About.css";

function About() {
  return (
    <section className="about-page">

      <div className="about-container">

        <div className="about-intro">
          <h1>About LocalBiz</h1>

          <p>
            LocalBiz is a modern multi-vendor marketplace platform designed to
            connect customers with trusted local businesses. The platform allows
            vendors to create their own digital storefront where they can list
            products, manage orders, and grow their business online.
          </p>

          <p>
            For customers, LocalBiz provides a simple and convenient shopping
            experience where they can explore products from multiple local
            vendors in one place. Instead of visiting different stores, users
            can browse, compare, and order products easily through a single
            platform.
          </p>
        </div>


        {/* FEATURES SECTION */}

        <div className="about-features">

          <div className="feature-card">
            <span>🏪</span>
            <h3>Multi-Vendor Marketplace</h3>
            <p>
              LocalBiz brings multiple vendors together on one platform,
              allowing customers to explore products from different sellers
              easily.
            </p>
          </div>

          <div className="feature-card">
            <span>📦</span>
            <h3>Easy Product Management</h3>
            <p>
              Vendors can add, update, and manage their product listings
              through a simple and user-friendly dashboard.
            </p>
          </div>

          <div className="feature-card">
            <span>🛒</span>
            <h3>Convenient Shopping</h3>
            <p>
              Customers can browse products, place orders, and track their
              purchases easily from a single interface.
            </p>
          </div>

          <div className="feature-card">
            <span>📊</span>
            <h3>Vendor Dashboard</h3>
            <p>
              Vendors get access to analytics, order management, and business
              insights to help them grow their sales.
            </p>
          </div>

        </div>


        {/* MISSION SECTION */}

        <div className="mission-section">

          <div className="mission-box">
            <h2>Our Mission</h2>
            <p>
              Our mission is to empower local businesses by providing them with
              a powerful digital platform that helps them reach more customers
              and grow their business in the online marketplace.
            </p>
          </div>

          <div className="mission-box">
            <h2>Our Vision</h2>
            <p>
              We aim to build a strong and sustainable digital marketplace that
              supports local vendors while providing customers with a seamless
              and reliable shopping experience.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default About;