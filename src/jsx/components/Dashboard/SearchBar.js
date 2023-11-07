import React, { useState } from "react";

const SeacrhBar = ({ list, show, defaultValue, onChange }) => {
    const [search, setSearch] = useState("")
    const [_list, set_List] = useState(list)
    const [options, setOptions] = useState([]);
    React.useEffect(() => {
        console.log(_list, "FIRST LIST FROM SEARCH")
    }, [_list])

    const handleChange = (e) => {
        if (!e.target.value) set_List(list) && setOptions(list);

        const filteredList = list.filter(
            item =>
                item.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        onChange(filteredList)
        // if (e.target.value) {
        //     const uniqueOptions = filteredList;
        //     setOptions(uniqueOptions);
        // } else {
        //     const uniqueOptions = list
        //     setOptions(uniqueOptions);
        //     console.log(options, "OPTIONS")
        // }
    }

    return (
        <div>
            <input className="searchBar" type="text" placeholder={defaultValue} onChange={(e) => handleChange(e)}></input>
            {/* <select>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select> */}
        </div>
    )
}
export default SeacrhBar