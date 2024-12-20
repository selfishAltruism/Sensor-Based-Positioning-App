export const postData = async (data) => {
  const req = [data];

  console.log(req);

  try {
    const response = await fetch("http://192.168.203.44:5000/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    console.log(responseData);

    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const checkState = async () => {
  try {
    const response = await fetch("http://192.168.203.44:5000/get");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();

    console.log(responseData);

    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const putDirection = async (data) => {
  try {
    const req = {
      direction: data,
    };

    const response = await fetch("http://192.168.203.44:5000/put", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
