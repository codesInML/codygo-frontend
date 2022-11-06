import { CreateBrand } from "./CreateBrand";
import { Space, Table, Spin, Modal, Input } from "antd";
import { useEffect, useState } from "react";
import axios from "../baseUrl";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsPencil } from "react-icons/bs";

const { Column } = Table;
export interface BrandType {
  key: string;
  name: string;
  numberOfHotels: number;
}

interface DeleteLoad {
  name: string;
  loading: boolean;
}

export const Brands = () => {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [brandUpdate, setBrandUpdate] = useState<any>([]);
  const [deleteLoading, setDeleteLoading] = useState<DeleteLoad>({
    name: "",
    loading: false,
  });
  const [open, setOpen] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [initialBrandName, setInitialBrandName] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleDelete = async (name: string) => {
    try {
      setDeleteLoading({ name, loading: true });
      await axios.delete("/brand", { data: { name } });
      setBrandUpdate([...brands]);
    } catch (error) {
      console.log(error);
    }
    setDeleteLoading({ name, loading: false });
  };

  const showUpdateModal = (name: string) => {
    setBrandName(name);
    setInitialBrandName(name);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const {
        data: { data },
      } = await axios.patch("/brand", {
        name: brandName,
        brandName: initialBrandName,
      });
      setBrandUpdate([data]);
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

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const {
          data: { data },
        } = await axios.get("/brand");
        setBrands(
          data.map((data: any): BrandType => {
            return {
              key: data.id,
              name: data.name,
              numberOfHotels: data.hotel.length,
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [brandUpdate]);

  useEffect(() => {}, [brandName, loading]);

  return (
    <section className="container">
      <CreateBrand setBrandUpdate={setBrandUpdate} />
      <h1>Brands at codygo</h1>
      <Table dataSource={brands} loading={loading}>
        <Column title="Brand name" dataIndex="name" key="name" />
        <Column
          title="Number of hotels"
          dataIndex="numberOfHotels"
          key="numberOfHotels"
        />
        <Column
          title="Action"
          key="action"
          render={(_: any, brand: BrandType) => (
            <Space size="middle">
              <a onClick={() => showUpdateModal(brand.name)}>
                <BsPencil style={{ fontSize: "20px" }} />
              </a>
              {deleteLoading.name == brand.name && deleteLoading.loading ? (
                <Spin />
              ) : (
                <a
                  style={{ color: "red" }}
                  onClick={() => handleDelete(brand.name)}
                >
                  <RiDeleteBin5Line style={{ fontSize: "20px" }} />
                </a>
              )}
            </Space>
          )}
        />
      </Table>
      <Modal
        title="Update brand"
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
    </section>
  );
};
