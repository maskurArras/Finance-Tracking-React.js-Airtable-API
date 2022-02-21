import { FaTrash } from "react-icons/fa";
import Loading from "./Loading";


const List = (props) => {
    // membuat props type income atau expense dan optional changeIn dengan ?
    const filteredData = props.data?.filter((item) => item.type === props.type);

    // membuat variable untuk format number ke rupiah
    const formatToRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number)
    }

    return (
        <div className={`col-4 bg-${props.bg} py-3 px-3`} style={{ borderRadius: "5px" }}>

            <h2 className="text-white text-center">
                {props.type === "expense" ? "Pengeluaran" : "Pemasukan"}
            </h2>
            {/* membuat efek loading */}
            {props.loading ? <Loading /> :

                <div>
                    {/* jika loading sudah selesai maka akan menampilkan data records */}
                    <h3 className="text-center text-white">
                        {/* optional changeIn dengan ? */}
                        {formatToRupiah(filteredData?.reduce((acc, curr) => acc + curr.nominal, 0))}
                    </h3>

                    <ul className="list-group">
                        {/* optional changeIn dengan ? */}
                        {filteredData?.map((item) => (
                            <li className="d-flex justify-content-between list-group-item mt-3" key={item.id}>
                                <span>{item.name}</span>
                                <div>
                                    <span>{formatToRupiah(item.nominal)}</span>
                                    <FaTrash className="text-danger"
                                        size={16}
                                        style={{
                                            marginLeft: '10px',
                                            cursor: 'pointer'
                                        }}
                                        // props untuk event click delete data
                                        onClick={() => props.removeData(item.id)}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>}


        </div>

    )
}

export default List;