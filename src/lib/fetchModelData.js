/**
 * fetchModel - dùng cho cả GET và POST, hỗ trợ session
 *
 * @param {string} url
 * @param {object} options (optional)
 */
async function fetchModel(url, options = {}) {
  const response = await fetch(url, {
    credentials: "include", // 🔥 BẮT BUỘC CHO SESSION
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const error = new Error("Fetch error");
    error.status = response.status;
    throw error; // 🔥 để component xử lý
  }

  return response.json();
}

export default fetchModel;
