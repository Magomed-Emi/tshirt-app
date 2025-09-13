import { useEffect, useState } from "react";
import CategorieCard from "../components/CategorieCard";

function Accueil() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fakeData = [
      {
        id_categorie: 1,
        nom: "T-shirts Classiques",
        image: "https://walkinparis.fr/cdn/shop/files/walk-in-paris-t-shirt-black-classic.jpg?v=1726043039&width=1100",
        hasProduits: true,
      },
      {
        id_categorie: 2,
        nom: "T-shirts Graphiques",
        image: "https://png.pngtree.com/png-clipart/20240814/original/pngtree-t-shirt-graphic-sushi-fight-kawaii-png-image_15776097.png",
        hasProduits: true,
      },
      {
        id_categorie: 3,
        nom: "T-shirts Sport",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8YQRcQvBimDI2mbdxS-j-3dsUDSKyhesVeg&s",
        hasProduits: true,
      },
      {
        id_categorie: 4,
        nom: "Éditions limitées",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA2fwbhf_BvlB4b-HSJielcl6TdtZnMFCNiw&s",
        hasProduits: false,
      },
      {
        id_categorie: 5,
        nom: "T-shirts personnalisés",
        image: "https://c-static.smartphoto.com/structured/repositoryimage/productcategory/fun_ideas/tshirtmen/topimages/0016/image/carrousel16.jpg",
        hasProduits: false,
      },
    ];

    setCategories(fakeData);
  }, []);

  return (
    <>
      <h1>Nos catégories</h1>
      <div className="grid-categories">
        {categories.map((cat) => (
          <CategorieCard key={cat.id_categorie} categorie={cat} />
        ))}
      </div>
    </>
  );
}

export default Accueil;
