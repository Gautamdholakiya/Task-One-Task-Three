const sucess = (code, result) => {
  return {
    status: "ok",
    code,
    result,
  };
};

const error = (code, result) => {
  return {
    status: "Error",
    code,
    result,
  };
};
module.exports = {
  sucess,
  error,
};
