import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getDrinksFromCategory } from '../services';

function Bebidas() {
  const { drinks, drinkCategories, setDrinksApiResults } = useContext(AppContext);
  const [clicked, setClicked] = useState({});

  if (!drinks) return <p>Carregando...</p>;

  const handleClick = async (category) => {
    const response = await getDrinksFromCategory(category);
    if (!clicked[category]) {
      setClicked({
        [category]: true,
      });
      return setDrinksApiResults(response);
    }
    setClicked({
      [category]: false,
    });
    return setDrinksApiResults([]);
  };

  return (
    <>
      <Header title="Bebidas" searchIcon />
      <button
        type="button"
        onClick={ () => setDrinksApiResults([]) }
      >
        All
      </button>
      { drinkCategories && drinkCategories.map(({ strCategory }) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          key={ strCategory }
          type="button"
          onClick={ () => handleClick(strCategory) }
        >
          {strCategory}
        </button>
      )) }
      { drinks && drinks.map((drink, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
          <img
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            width="100px"
          />
          <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
        </div>
      )) }
      <Footer />
    </>
  );
}

export default Bebidas;
