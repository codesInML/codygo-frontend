import type { PaginationProps } from "antd";
import { Pagination, Select } from "antd";
import { useEffect, useState } from "react";
import { Hotel } from "./Hotel";
import "./hotel.css";
import axios from "../baseUrl";

export interface HotelType {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  ratings: number;
  number_of_ratings: number;
  price: string;
  brandID: string | null;
  images: ImageType[];
  brand?: any;
}

export interface ImageType {
  id: string;
  image: string;
  isMain: boolean;
  hotelID: string;
}

interface OptionType {
  label: string;
  value: string;
}

const Hotels = () => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [current, setCurrent] = useState(1);
  const [orderBy, setOrderBy] = useState("");
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [total, setTotal] = useState(0);
  const [isFilter, setIsFilter] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const pageSize = 10;

  const onChange: PaginationProps["onChange"] = async (page: number) => {
    try {
      if (isFilter) {
        const {
          data: { data },
        } = await axios.post(
          `/hotel/filter?page=${page}&limit=${pageSize}&orderBy=${orderBy}`,
          {
            brands: filters,
          }
        );
        setHotels(data.hotels);
        setTotal(data.total);
      } else {
        const {
          data: { data },
        } = await axios.get(
          `/hotel?page=${page}&limit=${pageSize}&orderBy=${orderBy}`
        );
        setHotels(data.hotels);
        setTotal(data.total);
      }
    } catch (error) {
      console.log(error);
    }
    setCurrent(page);
  };

  const handleChange = async (value: any) => {
    try {
      setOrderBy(value.value);
      if (isFilter) {
        const {
          data: { data },
        } = await axios.post(
          `/hotel/filter?page=${current}&limit=${pageSize}&orderBy=${value.value}`,
          {
            brands: filters,
          }
        );
        setHotels(data.hotels);
        setTotal(data.total);
      } else {
        const {
          data: { data },
        } = await axios.get(
          `/hotel?page=${current}&limit=${pageSize}&orderBy=${value.value}`
        );
        setHotels(data.hotels);
        setTotal(data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = async (value: any) => {
    try {
      setFilters(value);
      setIsFilter(true);
      if (value.length === 0) {
        setIsFilter(false);
        const {
          data: { data },
        } = await axios.get(
          `/hotel?page=${current}&limit=${pageSize}&orderBy=${orderBy}`
        );
        setHotels(data.hotels);
        setTotal(data.total);
        return;
      }

      const {
        data: { data },
      } = await axios.post(
        `/hotel/filter?page=${current}&limit=${pageSize}&orderBy=${orderBy}`,
        {
          brands: value,
        }
      );
      setHotels(data.hotels);
      setTotal(data.total);
    } catch (error) {}
  };

  useEffect(() => {}, [hotels]);

  useEffect(() => {
    (async () => {
      try {
        let {
          data: { data: opt },
        } = await axios.get("/brand");
        setOptions(
          opt.map((option: any): OptionType => {
            return {
              label: option.name,
              value: option.id,
            };
          })
        );

        const {
          data: { data },
        } = await axios.get(`/hotel?limit=${pageSize}&page=${current}`);
        setHotels(data.hotels);
        console.log(data);
        setTotal(data.total);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="container">
      <div className="sort">
        <p>Sort by</p>
        <Select
          labelInValue
          defaultValue={{
            value: "recommendation",
            label: "Our Recommendations",
          }}
          style={{ width: 250 }}
          onChange={handleChange}
          options={[
            {
              value: "recommendation",
              label: "Our Recommendations",
            },
            {
              value: "ratings",
              label: "Ratings",
            },
            {
              value: "price",
              label: "Price",
            },
          ]}
        />
      </div>
      <div className="filter">
        <p>Filter by brand</p>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          onChange={handleFilterChange}
          options={options}
        />
      </div>
      {hotels.map((hotel: HotelType) => (
        <Hotel key={hotel.id} hotel={hotel} />
      ))}

      <div className="paginate">
        <Pagination
          current={current}
          onChange={onChange}
          pageSize={pageSize}
          total={total}
        />
      </div>
    </div>
  );
};

export default Hotels;
