import { useState } from "react";
import axios from "axios";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", category);

    try {
      const res = await axios.post(
        "http://localhost:3000/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Let Axios set this with boundary
          },
        }
      );
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <h3>Update Photos</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <button type="submit">Upload</button>
      </form>
    </>
  );
}

export default UploadForm;
