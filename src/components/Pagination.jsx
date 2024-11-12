import React, { useState, useEffect } from "react";
import "./Pagination.css";

const Pagination = () => {
  const [data, setData] = useState([]);

  const [offSet, setOffSet] = useState(0);

  const limit = 10;

  const [totalItems, setTotalItems] = useState(0);

  const [buttonIndex, setButtonIndex] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(
        `https://stagingapi.enalo.in/inventory/get-items/?limit=${limit}&offset=${offSet}`
      );
      const jsonData = await response.json();
      setData(jsonData.results);
      setTotalItems(jsonData.count);
    } catch (error) {
      console.log("Data is not coming");
    }
  };

  useEffect(() => {
    getData();
  }, [offSet]);

  const totalPages = Math.ceil(totalItems / limit);

  const handlePageClick = (pageNumber) => {
    setOffSet((pageNumber - 1) * limit);
    setButtonIndex(pageNumber - 1);
  };

  const handleNext = () => {
    if (offSet < (totalPages - 1) * limit) {
      setOffSet((prevState) => prevState + limit);
    }
  };
  const handlePrevious = () => {
    if (offSet > 0) {
      setOffSet((prevState) => prevState - limit);
    }
  };

  console.log("data is ", data);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Store Name</th>
            <th>Business Name</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((items) => (
              <tr key={items.id}>
                <th>{items.id}</th>
                <th>{items.store_name}</th>
                <th>{items.business_name}</th>
              </tr>
            ))}
        </tbody>
      </table>

      <div>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button onClick={handlePrevious} disabled={offSet === 0}>
            {"<"}
          </button>

          {[...Array(totalPages)].map((items, index) => (
            <button
              className={buttonIndex == index + 1 ? "ShowButton" : "hideButton"}
              key={index}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={offSet >= (totalPages - 1) * limit}
            onClick={handleNext}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
