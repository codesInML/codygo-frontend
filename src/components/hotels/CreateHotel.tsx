import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./hotel.css";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select, InputNumber, Upload } from "antd";
import axios from "../baseUrl";
import { onError, onSuccess } from "./Hotel";

export const CreateHotel = () => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateHotel = async (values: any) => {
    setIsLoading(true);
    try {
      console.log(values);
      const data = new FormData();
      data.append("name", values.name);
      data.append("city", values.city);
      data.append("country", values.country);
      data.append("address", values.address);
      data.append("brandID", values.brand);
      data.append("price", values.price);
      data.append("ratings", values.ratings);
      data.append("number_of_ratings", values.reviews);
      data.append(
        "featuredImage",
        values.featuredImage?.fileList[0].originFileObj
      );
      for (let i = 0; i < values.otherImages?.fileList.length; i++) {
        data.append(
          "otherImages",
          values.otherImages?.fileList[i].originFileObj
        );
      }

      const {
        data: { data: response },
      } = await axios.post("/hotel", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsLoading(false);
      console.log(response);
      navigate("/");
      onSuccess("Hotel has been created successfully");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      onError("Could not create hotel");
    }
  };
  useEffect(() => {
    (async () => {
      try {
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
      <h1>Create Hotel</h1>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleCreateHotel}
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
        <Form.Item label="Featured Image" name="featuredImage">
          <Upload listType="picture-card" maxCount={1}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Other Images" name="otherImages">
          <Upload listType="picture-card" maxCount={30} multiple>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Create Hotel">
          <Button loading={isLoading} type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};
