export const postData = async (data) => {
  const req = [data.bluetooth, data.gyro, data.mag, data.accel];
  //const req = [data.bluetooth];

  console.log(req);

  try {
    const response = await fetch("", {
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
