import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';

// menginstall axios => npm install axios --save atau npm i axios

const App = () => {

  const [data, setData] = useState([]);

  // membuat efek loading
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);


  // menggunakan airtable APi
  const getDataFromAirTable = async () => {
    try {
      // config auth untuk airtable
      const config = {
        headers: {
          Authorization: "Bearer keyTy6gitLBR7NDPJ",
        },
      };

      // membuat efek loading
      setLoading(true);
      const response = await axios.get("https://api.airtable.com/v0/appOKyobEMKTtCbYZ/Table%201?maxRecords=100&view=Grid%20view", config);
      // console.log(response.data.records);

      // membuat functioan untuk menampung data baru dari data record Api
      const newData = response.data.records.map((item) => ({
        id: item.id,
        name: item.fields.name, // mengambil data name dari airtable 
        description: item.fields.description, // mengambil data description dari airtable
        nominal: item.fields.nominal, // mengambil data nominal dari airtable
        type: item.fields.type, // mengambil data type dari airtable
      }));

      setData(newData);
    } catch (error) {
      console.log(error);
    } finally {
      // membuat efek loading
      setLoading(false);
    }
  };

  // get data dari local storage ke airtable API
  useEffect(() => {
    getDataFromAirTable();
  }, []);

  // console.log("data", data);

  // mengambil data dari inputan form
  const addData = async (newData) => {

    // membuat function untuk menambah data dari form input ke airtable API
    try {
      // mensetting agar data dapat terkirim dan di terima dengan bentuk JSON dengan data array yang benar atau string
      const sendData = JSON.stringify({
        records: [
          {
            fields: newData,
          },
        ],
      });

      // config auth untuk airtable
      const config = {
        headers: {
          Authorization: "Bearer keyTy6gitLBR7NDPJ",
          // menambahkan axios add content type applications/json
          'Content-Type': 'application/json'
        },
      };

      // set post loading
      setPostLoading(true);

      const response = await axios.post("https://api.airtable.com/v0/appOKyobEMKTtCbYZ/Table%201", sendData, config);

      // menambahkan record data 
      const responseData = response.data.records[0]
      const fixData = {
        id: responseData.id,
        name: responseData.fields.name, // mengambil data name dari airtable 
        description: responseData.fields.description, // mengambil data description dari airtable
        nominal: responseData.fields.nominal, // mengambil data nominal dari airtable
        type: responseData.fields.type, // mengambil data type dari airtable
      }

      //sebelum menambahkan data dan menampilkan data di form list
      setData([...data, fixData]);
    } catch (error) {
      console.log(error);
    } finally {
      setPostLoading(false);
    }

  };

  // menghapus data
  const removeData = async (id) => {

    try {

      const axiosParams = {
        method: "delete",
        url: `https://api.airtable.com/v0/appOKyobEMKTtCbYZ/Table%201/${id}`,
        headers: {
          Authorization: "Bearer keyTy6gitLBR7NDPJ",
          // menambahkan axios add content type applications/json
          'Content-Type': 'application/json',
        },
      };


      setLoading(true);

      // menggunakan axios untuk method DELETE
      await axios(axiosParams);

      const newData = data.filter((itme) => itme.id !== id);

      // menampilkan data terbaru
      setData(newData);
      alert("berhasil delete data");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>

      <div className="container text-white">
        <div className="row mb-4">
          <h1 className='text-center text-danger mb-3'>Aplikasi Tracking Keuangan</h1>
          <h3 className="text-center mb-4 text-warning">Fathan ArRasyid</h3>
          <div className="d-flex justify-content-center align-items-center">
            <img src="/image.svg" alt="just-image" style={{ objectFit: "scale-down", width: "15rem" }} />
          </div>
        </div>
        <div className="row mt-3">
          {/* menggunakan props  dan menambahkan efek loading*/}
          <List data={data} type="income" bg="primary" removeData={removeData} loading={loading} />
          {/* menambahkan postLoading di form */}
          <Form addData={addData} postLoading={postLoading} />
          {/* menggunakan props  dan menambahkan efek loading*/}
          <List data={data} type="expense" bg="success" removeData={removeData} loading={loading} />
        </div>
      </div>

    </div>
  );
};

export default App;