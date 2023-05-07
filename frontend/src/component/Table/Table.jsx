import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import DataTables from "datatables.net";

// Import necessary styles
import "datatables.net-dt/css/jquery.dataTables.min.css";
// Importing dataset
import axios from "axios";

// Initialize jquery and Datatable


const Table = () => {
    // const tableRef = useRef();
    let DataTable = DataTables("#myTable", $);
    const [dataSet, setDataSet] = useState([]);
    useEffect(() => {
        axios
            .get(
                "http://localhost:5000/data"
            ).then((res) => {
                setDataSet(res?.data?.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        // When component loads, fill table with data
        const data = dataSet?.map(value => [value?.name ? value?.name : "",
        value?.age ? value?.age+"/"+value?.sex.charAt(0).toUpperCase() : "",
        value?.mobile ? value?.mobile : "",
        value?.addr ? value?.addr+", "+value?.city+", "+value?.state+", "+value?.country+" "+value?.pincode : "",
        value?.idType ? value?.idType+"("+value?.idNumber+")" : "",
        value?.guardianName ? value?.guardianName : "",
        value?.nationality ? value?.nationality : ""])
        new DataTable("#myTable", {
            data: data && data,
            "bDestroy": true,
            columns: [
                { title: "Name" },
                { title: "Age/Sex" },
                { title: "Mobile" },
                { title: "Address" },
                { title: "Govt ID" },
                { title: "Guardian Details" },
                { title: "Nationality" }
            ],
        });
    }, [dataSet]);

    // Create a reference for the table
    return <table id="myTable"></table>;
};

export default Table;