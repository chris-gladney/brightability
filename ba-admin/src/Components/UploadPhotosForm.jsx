import { useState } from "react";
import axios from "axios";

function UploadPhotosForm() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("buddy");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", category);

    try {
      const res = await axios.post(
        "http://localhost:3000/admin/images/upload",
        formData
      );
      console.log("Upload Success:", res.data)
    } catch (error) {
  if (error.response) {
    console.error("❌ Server responded:", error.response.data);
  } else if (error.request) {
    console.error("❌ No response received:", error.request);
  } else {
    console.error("❌ Axios config error:", error.message);
  }
}
  };

  return (
    <>
      <h3>Update Photos</h3>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => {
            console.log(e.target.files, "<<< e");
            setFile(e.target.files[0]);
          }}
        />
        <br />
        <label htmlFor="photo-category">Category: </label>
        <select id="photo-category" name="photo-category" onChange={(e) => setCategory(e.target.value)}>
          <option value="buddy">Buddy</option>
          <option value="hub">Hub</option>
          <option value="social">Social</option>
          <option value="summer-trips">Summer Trips</option>
        </select>
        <br />
        <button type="submit">Upload</button>
      </form>
      
      {/* Below is a button for development that logs the file and category selected */}
      <button onClick={() => {
        console.log(file, "<<< file")
        console.log(category, "<<< category")
      }}>Development Photos</button>
    </>
  );
}

export default UploadPhotosForm;
