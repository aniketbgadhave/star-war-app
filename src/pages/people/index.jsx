import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";

const People = () => {
  const [cardData, setCardData] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1);
  const [imageLoading, setImageLoading] = useState({});
  const [loading, setLoading] = useState(true); 
  const [loadingEnrichedData, setLoadingEnrichedData] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    homeworld: "",
    film: "",
    species: "",
  });

  useEffect(() => {
    // Fetch initial page data
    fetchPageData(currentPage);

    // Reset filters and search query when page changes
    setFilters({
      homeworld: "",
      film: "",
      species: "",
    });
    setSearchQuery("");
  }, [currentPage]);

  const fetchPageData = async(page) => {
    setLoading(true); 
    axios
      .get(`https://swapi.dev/api/people/?page=${page}`)
      .then(async(res) => {
        // setCardData(res?.data?.results)
        
        const people = res?.data?.results;

        setCardData(people);


        setTotalPages(Math.ceil(res?.data?.count / 10));
        // Reset image loading state when new page data is fetched
        setImageLoading({});
        await fetchEnrichedData(people);
        setLoading(false);
      })
      .catch((err) => {
        console.log({ err })
        setLoading(false);
      });
  }
  const fetchEnrichedData = async (initialData) => {
    setLoadingEnrichedData(true);
    try {
      const enrichedData = await Promise.all(
        initialData.map(async (person) => {
          const homeworldName = await axios
            .get(person.homeworld)
            .then((res) => res.data.name);

          const speciesName = person.species.length
            ? await axios.get(person.species[0]).then((res) => res.data.name)
            : "Unknown";

          const filmNames = await Promise.all(
            person.films.map((filmUrl) =>
              axios.get(filmUrl).then((res) => res.data.title)
            )
          );

          return {
            ...person,
            homeworldName,
            speciesName,
            filmNames,
          };
        })
      );

      // Update the card data with enriched details
      setCardData(enrichedData);
      setFilteredData(enrichedData);
      setLoadingEnrichedData(false);
    } catch (err) {
      console.error(err);
      setLoadingEnrichedData(false);
    }
  };

  const handleCardClick = (person) => {
    setSelectedPerson(person);
  };

  const closeModal = () => {
    setSelectedPerson(null);
  };

  const handleOutsideClick = (e) => {
    // Check if the click is outside the modal content
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };
  // const filteredCardData = filteredData.filter((item) =>
  //   item.name.toLowerCase().includes(searchQuery) 
  //   // || item.gender.toLowerCase().includes(searchQuery)
  // );
  // Handle image load event
  const handleImageLoad = (name) => {
    setImageLoading((prevState) => ({ ...prevState, [name]: false }));
  };

  // Handle image load start
  const handleImageLoadStart = (name) => {
    setImageLoading((prevState) => ({ ...prevState, [name]: true }));
  };


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    console.log("Filters : ")
  };

  useEffect(() => {
    const filtered = cardData.filter((person) => {
      const matchesSearch =
        !searchQuery ||
        person.name.toLowerCase()?.includes(searchQuery.toLowerCase())
      const matchesHomeworld =
        !filters.homeworld || person.homeworldName === filters?.homeworld;
      const matchesFilm =
        !filters.film || person?.filmNames?.includes(filters?.film);
      const matchesSpecies =
        !filters.species || person.speciesName === filters?.species;
      return matchesSearch && matchesHomeworld && matchesFilm && matchesSpecies;
    });
    setFilteredData(filtered);
  }, [filters, searchQuery, cardData]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const showCard = () => {
    return filteredData?.map((item, index) => (
      <div
        key={index}
        className={`card ${selectedPerson && selectedPerson !== item ? "faded" :""}`}
        onClick={() => handleCardClick(item)}
      >
        <div className="card-content">
          <div>
            {imageLoading[item.name] ? (
              <p>Loading...</p>
            ) : (
              <img
                src={`https://api.multiavatar.com/${item.name}.svg`}
                alt="Avatar"
                onLoad={() => handleImageLoad(item.name)}
                onLoadStart={() => handleImageLoadStart(item.name)}
              />
            )}
          </div>
          <h3>Name: {item.name}</h3>
        </div>
        {selectedPerson === item && (
          <div className="modal-overlay" onClick={handleOutsideClick}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              {item?.name ? (
                <img src={`https://api.multiavatar.com/${item.name}.svg`} alt="Random" />
              ) : (
                <p>Loading...</p>
              )}
              <h3>Name: {selectedPerson.name}</h3>
              <h3>Birth Year: {selectedPerson.birth_year}</h3>
              <h3>Gender: {selectedPerson.gender}</h3>
              <h3>Height: {selectedPerson.height}</h3>
              <h3>Homeworld: {selectedPerson.homeworldName}</h3>
              <h3>Species: {selectedPerson.speciesName}</h3>
              <h3>Films: {selectedPerson?.filmNames?.join(", ")}</h3>
            </div>
          </div>
        )}
      </div>
    ));
  };

  const getUniqueOptions = (key) => {
    const allValues = cardData.flatMap((person) =>
      Array.isArray(person[key]) ? person[key] : [person[key]]
    );
    return [...new Set(allValues)];
  };

  return (
    <>
        <div className="search-box">
            <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
            />
            
            <div className="filter-container">
                <select name="homeworld" onChange={handleFilterChange} value={filters.homeworld}>
                <option value="">All HomeWorld</option>
                {getUniqueOptions("homeworldName").map((homeworld, index) => (
                    <option key={index} value={homeworld}>
                    {homeworld}
                    </option>
                ))}
                </select>

                <select name="film" onChange={handleFilterChange} value={filters.film}>
                <option value="">All Films</option>
                {getUniqueOptions("filmNames").map((film, index) => (
                    <option key={index} value={film}>
                    {film}
                    </option>
                    )
                )}
                </select>
                
                <select name="species" onChange={handleFilterChange} value={filters.species}>
                <option value="">All Species</option>
                {getUniqueOptions("speciesName").map((species, index) => (
                    <option key={index} value={species}>
                    {species}
                    </option>
                ))}
                </select>
            </div>
        </div>        
      
        <div className="people">
            {
            loading ? (
                <>
                    <div className="loader-text">
                        L
                        <span>oa</span>
                        <span>di</span>
                        <span>ng</span>
                        <span>...</span>
                    </div>
                </>
                
                ) : filteredData?.length>0 ?(
                <>
                    {filteredData && showCard()}            
                </>
                ) : (<p className="loader-text">No Data Found</p>)
            }
        </div>
      <div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>

    </>
  );
};
const Pagination = ({ totalPages, currentPage, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default People;