import { Button, Modal, Input } from "antd";
import React, { useEffect, useState } from "react";
import axios from "../baseUrl";

export const CreateBrand = (props: any) => {
  const [open, setOpen] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const {
        data: { data },
      } = await axios.post("/brand", { name: brandName });
      props.setBrandUpdate([data]);
    } catch (error) {
      console.log(error);
    }
    setConfirmLoading(false);
    setOpen(false);
    setBrandName("");
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
        <Input
          placeholder="Brand name"
          value={brandName}
          onChange={handleChange}
        />
      </Modal>
    </>
  );
};
