import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments, getHomepageCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const [homepageCategories, setHomepageCategories] = useState([]);

  useEffect(() => {
    const getHomepageCategories = async () => {
      const res = await getHomepageCategoriesAndDocuments();
      setHomepageCategories(res);
    }
    getHomepageCategories();
  }, [])

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);
  const value = { categoriesMap, homepageCategories };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
