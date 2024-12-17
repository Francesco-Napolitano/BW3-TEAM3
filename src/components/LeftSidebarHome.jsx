
import "../styles/LeftSidebarHome";

const LeftSidebarHome = () => {
  return (
    <div className="leftSidebar">
      {/* Header Section */}
      <div className="profileCard">
        <div className="profileBackground"></div>
        <div className="profileImage">
          <img src="https://via.placeholder.com/80" alt="profile" />
        </div>
        <div className="profileDetails">
          <h3>Tina Erfanian</h3>
          <p>English & Italiano </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="profileStats">
        <div className="statItem">
          <span>Profile viewers</span>
          <span className="statValue">4</span>
        </div>
        <div className="statItem">
          <span>Post impressions</span>
          <span className="statValue">4</span>
        </div>
      </div>

      {/* Sales Navigator Promo */}
      <div className="salesPromo">
        <p>Connect with 3.8x more decision-makers</p>
        <button className="salesButton">Try Sales Nav for €0</button>
      </div>

      {/* Saved Items */}
      <div className="savedItems">
        <p>🔖 Saved items</p>
      </div>



    </div>
  );
};
     

export default LeftSidebarHome;
