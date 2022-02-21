import { useState } from "react";
import Loading from "./Loading";

const Form = ({ addData, postLoading }) => {

    // membuat state untuk menampung data yang diinputkan
    const [type, setType] = useState('');
    // membending useState ke form
    const [form, setForm] = useState({
        name: '',
        description: '',
        nominal: 0,
    });

    // mendextract data dari form
    const { name, description, nominal } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // setting clear form input setelah data di simpan
    const clearForm = () => {
        setType("");
        setForm({
            name: "",
            description: "",
            type: "",
            nominal: 0,
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // menampilkan hasil ayng sudah di input di form
        addData({
            name,
            description,
            type,
            // mengset konversi string ke integer
            nominal: +nominal,
            createdAt: new Date().toISOString(),

        });

        // mengclear input form
        clearForm();
    };

    const typeString = type === "Expense" ? "Pengeluaran" : type === "Income" ? "Pemasukan" : "";


    return (
        <div className="col-4 ">
            <form className="px-2 py-2" onSubmit={onSubmit}>

                <div className="form-group mb-1">
                    <label className="form-group">Pilih Tipe : </label>
                    {/* membuat conditional rendering */}
                    <select className="form-control p-2" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="" >- Pilih Tipe -</option>
                        <option value="income">Pemasukan</option>
                        <option value="expense">Pengeluaran</option>
                    </select>
                </div>

                <div className="form-group mb-1">
                    <label className="mb-2 ">Nama {typeString} </label>
                    <input name="name" value={name} onChange={onChange} type="text" className="form-control" placeholder={`Nama dari ${typeString} `} disabled={!type} />
                </div>

                <div className="form-group mb-1">
                    <label className="form-group">Deskripsi : </label>
                    <textarea name="description" value={description} onChange={onChange} className="form-control" placeholder={`Inputkan Deskripsi ${typeString}`} disabled={!type}></textarea>
                </div>

                <div className="form-group mb-1">
                    <label className="form-group">Nominal</label>
                    <input name="nominal" value={nominal} onChange={onChange} type="number" className="form-control" placeholder={`Inputkan Nominal ${typeString}`} disabled={!type} />
                </div>

                <div className="form-group mb-1 mt-3">
                    {/* menambahkan postLoading saat akan menyimpan data */}
                    <button type="submit" className="btn btn-primary w-100" disabled={!type || postLoading}>
                        Simpan {postLoading && <Loading />}
                    </button>
                </div>
            </form>
        </div>


    )
}

export default Form;