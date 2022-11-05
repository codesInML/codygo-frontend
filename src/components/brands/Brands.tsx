import "./brand.css";
import { CreateBrand } from "./CreateBrand";
import { Space, Table, Spin, Alert } from "antd";
import { useEffect, useState } from "react";
import axios from "../baseUrl";

const { Column } = Table;
interface BrandType {
  key: string;
  name: string;
  numberOfHotels: number;
}

interface DeleteLoad {
  name: string;
  loading: boolean;
}

export const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [brandUpdate, setBrandUpdate] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState<DeleteLoad>({
    name: "",
    loading: false,
  });

  const handleDelete = async (name: string) => {
    try {
      setDeleteLoading({ name, loading: true });
      console.log(name);
      await axios.delete("/brand", { data: { name } });
      setBrandUpdate([...brands]);
    } catch (error) {
      console.log(error);
    }
    setDeleteLoading({ name, loading: false });
  };

  const handleUpdate = async (id: string) => {};

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await axios.get("/brand");
        console.log(data);
        setBrands(
          data.map((data: any): BrandType => {
            return {
              key: data.id,
              name: data.name,
              numberOfHotels: data.Hotel.length,
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [brandUpdate]);

  return (
    <section className="container">
      <CreateBrand />
      <h1>Brands at codygo</h1>
      <Table dataSource={brands}>
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
              <a onClick={() => handleUpdate(brand.key)}>Update</a>
              {deleteLoading.name == brand.name && deleteLoading.loading ? (
                <Spin />
              ) : (
                <a
                  style={{ color: "red" }}
                  onClick={() => handleDelete(brand.name)}
                >
                  Delete
                </a>
              )}
            </Space>
          )}
        />
      </Table>
    </section>
  );
};
