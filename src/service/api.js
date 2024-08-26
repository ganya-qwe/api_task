import axios from "axios";
import { toast } from "vue3-toastify";

export const search = async (input, page = null) => {
  try {
    const { data } = await axios.get(
      page
        ? `https://chroniclingamerica.loc.gov/search/titles/results/?terms=${input}&format=json&page=${page}`
        : `https://chroniclingamerica.loc.gov/search/titles/results/?terms=${input}&format=json`,
    );
    return data;
  } catch (e) {
    toast.error(
      "Unexpected Error. We are working on it. Please try again later.",
    );
  }
};

export const getDetails = async (lccn) => {
  try {
    const { data } = await axios.get(
      `https://chroniclingamerica.loc.gov/lccn/${lccn}.json`,
    );
    return data;
  } catch (e) {
    toast.error(
      "Unexpected Error. We are working on it. Please try again later.",
    );
  }
};
