import { useContext, useState, useEffect } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import DirectoryItem from "../directory-item/directory-item.component";
import { DirectoryContainer } from "./directory.styles";

const Directory = () => {
  const { homepageCategories } = useContext(CategoriesContext);
  const [categories, setCategories] = useState(homepageCategories);

  useEffect(() => {
    setCategories(homepageCategories);
  }, [homepageCategories]);

  return (
    <DirectoryContainer>
    {categories?.map((category) => (
      <DirectoryItem key={category.id} category={category} />
    ))}
    </DirectoryContainer>
  );
};

export default Directory;




