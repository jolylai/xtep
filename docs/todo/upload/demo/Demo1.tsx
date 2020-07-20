import React from 'react';

function index() {
  return (
    <form
      method="post"
      encType="multipart/form-data"
      action="https://jsonplaceholder.typicode.com/post"
    >
      <input type="file" name="file" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default index;
