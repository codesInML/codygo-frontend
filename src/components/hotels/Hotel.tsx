import Img from "../../assets/chastity-cortijo-M8iGdeTSOkg-unsplash.jpg";
import { StarFilled } from "@ant-design/icons";
import { GrLocation } from "react-icons/gr";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

export const Hotel = () => {
  return (
    <section className="hotel">
      <div className="featured-image">
        <img src={Img} alt="image" />
      </div>
      <div className="main">
        <h2>Hotel Name and the rest</h2>
        <div className="star">
          <StarFilled style={{ fontSize: "16px", color: "rgb(252,158,21" }} />
          <StarFilled style={{ fontSize: "16px", color: "rgb(252,158,21" }} />
          <StarFilled style={{ fontSize: "16px", color: "rgb(252,158,21" }} />
          <p>Hotel</p>
        </div>
        <div className="location">
          <GrLocation style={{ fontSize: "24px" }} />
          <p>Canyon Lake</p>
          <IoIosArrowDown style={{ fontSize: "24px", float: "right" }} />
        </div>
        <div className="reviews">
          <button>7.9</button>
          <h5>Good reviews</h5>
          <p>&#32;&#40;125&#41;</p>
          <IoIosArrowDown style={{ fontSize: "24px", float: "right" }} />
        </div>
      </div>
      <div className="view">
        <div className="cancellation">
          <h5>Hotels.com</h5>
          <h4>
            <BsFillCheckCircleFill /> Free cancellation
          </h4>
          <div className="view-deal">
            <h2>$150</h2>
            <button>
              View Deal
              <span>
                <IoIosArrowForward
                  style={{ fontSize: "16px", verticalAlign: "middle" }}
                />
              </span>
            </button>
          </div>
        </div>
        <div className="prices">
          <div className="price">
            <h4>Priceline</h4>
            <h3>$150</h3>
          </div>
          <div className="lowest-price">
            <h4>Our lowest price:</h4>
            <h3>$150</h3>
          </div>
        </div>
      </div>
    </section>
  );
};
