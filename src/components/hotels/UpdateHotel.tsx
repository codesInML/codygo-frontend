import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./hotel.css";
import { Form, Input, Button, Select, InputNumber } from "antd";
import axios from "../baseUrl";
import { onError, onSuccess } from "./Hotel";
import { HotelType } from "./Hotel-List";

export const UpdateHotel = () => {
  const [options, setOptions] = useState([]);
  const [hotel, setHotel] = useState<HotelType>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { hotelID } = useParams();

  const handleUpdateHotel = async (values: any) => {
    setIsLoading(true);
    try {
      console.log(values);

      const {
        data: { data: response },
      } = await axios.patch(`/hotel/${hotelID}`, values);
      setIsLoading(false);
      console.log(response);
      navigate("/");
      onSuccess("Hotel has been updated successfully");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      onError("Could not update hotel");
    }
  };

  useEffect(() => {}, [hotel]);
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data: hotelData },
        } = await axios.get(`/hotel/${hotelID}`);
        setHotel(hotelData);
        const {
          data: { data },
        } = await axios.get("/brand");
        setOptions(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <section className="container create-hotel">
      <h1>Update Hotel</h1>

      {hotel && (
        <Form
          initialValues={{
            ...hotel,
            brand: hotel.brand.name,
            reviews: hotel.number_of_ratings,
          }}
          layout="vertical"
          onFinish={handleUpdateHotel}
        >
          <Form.Item label="Name" name={"name"}>
            <Input />
          </Form.Item>
          <Form.Item label="City" name={"city"}>
            <Input />
          </Form.Item>
          <Form.Item label="Country" name={"country"}>
            <Input />
          </Form.Item>
          <Form.Item label="Address" name={"address"}>
            <Input />
          </Form.Item>
          <Form.Item label="Select brand" name={"brand"}>
            <Select>
              {options.map((option: any) => {
                return (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Price" name={"price"}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Ratings" name={"ratings"}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Number of reviews" name={"reviews"}>
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      )}
    </section>
  );
};
