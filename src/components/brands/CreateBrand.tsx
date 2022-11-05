import { Button, Modal, Input } from "antd";
import React, { useState } from "react";
import axios from "../baseUrl";

export const CreateBrand: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      await axios.post("/brand", { name: brandName });
      alert("success");
    } catch (error) {
      console.log(error);
    }
    setConfirmLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandName(e.target.value);
  };

  return (
    <>
      <Button style={{ margin: "1rem 0" }} type="primary" onClick={showModal}>
        Create new brand
      </Button>
      <Modal
        title="Create a brand"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input placeholder="Brand name" onChange={handleChange} />
      </Modal>
    </>
  );
};
