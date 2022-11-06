import { StarFilled } from "@ant-design/icons";
import { GrLocation } from "react-icons/gr";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { HotelType } from "./Hotel-List";
import { Modal, Carousel, Button } from "antd";
import { useEffect, useState } from "react";
import axios from "../baseUrl";
import { useNavigate } from "react-router-dom";

export const onSuccess = (message: string) => {
  Modal.success({
    content: message,
  });
};

export const onError = (message: string) => {
  Modal.error({
    title: "Error",
    content: message,
  });
};

export const Hotel = ({ hotel }: { hotel: HotelType }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [viewHotel, setViewHotel] = useState<HotelType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const generateStar = (amount: number) => {
    const stars = [];
    for (let i = 0; i < amount; i++) {
      stars.push(
        <StarFilled
          key={i}
          style={{ fontSize: "16px", color: "rgb(252,158,21" }}
        />
      );
    }
    return stars;
  };

  const getRatingStar = (ratings: number) => {
    if (ratings < 8.0) {
      return generateStar(3);
    } else if (ratings < 9.0) {
      return generateStar(4);
    } else {
      return generateStar(5);
    }
  };

  const showModal = async () => {
    setOpen(true);
    try {
      const {
        data: { data },
      } = await axios.get(`/hotel/${hotel.id}`);
      console.log(data);
      setViewHotel(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
    } catch (error) {
      console.log(error);
    }
    setConfirmLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {}, [viewHotel, open, isLoading]);

  const handleDeleteHotel = async (id: string) => {
    setIsLoading(true);
    try {
      const {
        data: { data },
      } = await axios.delete(`/hotel/${id}`);
      console.log(data);
      setOpen(false);
      navigate("/brand");
      navigate("/");
      onSuccess("Hotel has been deleted successfully");
    } catch (error) {
      console.log(error);
      onError("Could not delete hotel");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="hotel">
        <div className="featured-image">
          <img src={hotel.images[0].image} alt="hotel" />
        </div>
        <div className="content">
          <div className="main">
            <h2>{hotel.name}</h2>
            <div className="star">
              {getRatingStar(hotel.ratings)}
              <p>{hotel?.brand?.name}</p>
            </div>
            <div className="location">
              <GrLocation style={{ fontSize: "24px" }} />
              <p>{hotel.city}</p>
            </div>
            <div className="reviews">
              <button>{hotel.ratings}</button>
              <h5>Good reviews</h5>
              <p>&#32;&#40;{hotel.number_of_ratings}&#41;</p>
            </div>
          </div>
          <div className="view">
            <div className="cancellation">
              <h5>Hotels.com</h5>
              <h4>
                <BsFillCheckCircleFill /> Free cancellation
              </h4>
              <div className="view-deal">
                <h2>${hotel.price}</h2>
                <button onClick={showModal}>
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
              <h4>Our lowest price:</h4>
              <h3>${hotel.price}</h3>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Hotel details"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
      >
        {viewHotel && (
          <>
            <div className="hotel">
              <div className="featured-image">
                <img src={hotel.images[0].image} alt="hotel" />
              </div>
              <div className="content">
                <div className="main">
                  <h2>{hotel.name}</h2>
                  <div className="star">
                    {getRatingStar(hotel.ratings)}
                    <p>{hotel.brand.name}</p>
                  </div>
                  <div className="location">
                    <GrLocation style={{ fontSize: "24px" }} />
                    <p>{hotel.city}</p>
                  </div>
                  <div className="reviews">
                    <button>{hotel.ratings}</button>
                    <h5>Good reviews</h5>
                    <p>&#32;&#40;{hotel.number_of_ratings}&#41;</p>
                  </div>
                </div>
                <div className="view">
                  <div className="cancellation">
                    <h5>Hotels.com</h5>
                    <h4>
                      <BsFillCheckCircleFill /> Free cancellation
                    </h4>
                    <div className="view-deal">
                      <h2>${hotel.price}</h2>
                    </div>
                  </div>
                  <div className="prices">
                    <h4>Our lowest price:</h4>
                    <h3>${hotel.price}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="otherImages">
              <Carousel autoplay>
                {viewHotel.images.map((image: any) => {
                  return (
                    <div key={image.id}>
                      <img src={image.image} alt="viewHotel" />
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <Button
              type="primary"
              danger
              loading={isLoading}
              onClick={() => handleDeleteHotel(viewHotel.id)}
            >
              Delete Hotel
            </Button>
          </>
        )}
      </Modal>
    </>
  );
};
