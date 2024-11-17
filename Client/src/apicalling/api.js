import axios from "axios"

const deletepost = async (id) => {
    try {
        const response = await axios.delete(`https://localhost:4000/app/delete/${id}`);

        return response
    }
    catch (err) {
        console.log(err)
    }
}