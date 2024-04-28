const { toast } = require("react-toastify");

export const notify = (text, response) => {
    toast[response](text);
  }