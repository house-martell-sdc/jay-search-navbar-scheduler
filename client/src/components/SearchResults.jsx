import React from 'React';
import style from '../css/Search.css';


const SearchResults = (props) => {
    let cityMatch = props.cityMatch;
    let cuisineMatch = props.cuisineMatch;
    let restaurantMatch = props.restaurantMatch;
    return (
        <div className={style.searchResults}>
            <div className={style.headerContainerSearch}>
                <div className={props.handleHoverState === true ? (style.searchHeader + ' ' + style.searchHeaderDefault) : (style.searchHeader)}><div className={style.textForSearchHeader}>search: </div><div className={style.searchHeaderText}>"{props.text}"</div></div>
            </div>
            <div className={style.searchedSection}>
                {cityMatch.length !== 0 ? <div className={style.locationResults}>
                    <div className={style.searchCategoryTextContainer}  onMouseEnter={props.handleHover}>
                        <i className={"material-icons" + ' ' + style.searchResultLogo}>location_on</i>
                        <div className={style.searchCategoryText}>Locations</div>
                    </div>
                    <ul className={style.ulContainerSearch}>
                        {props.cityMatch.map(locaMatch => <div className={style.hoverOnSearch} onMouseEnter={props.handleHover}><div className={style.searchResultText}>{locaMatch.cityname}</div></div>)}
                    </ul>
                </div> : <div></div>}
            </div>
            <div className={style.searchedSection}>
                {cuisineMatch.length !== 0 ? <div className={style.cuisinesResults}>
                    <div className={style.searchCategoryTextContainer} onMouseEnter={props.handleHover}>
                        <i className={"material-icons" + ' ' + style.searchResultLogo}>restaurant_menu</i>
                        <div className={style.searchCategoryText}>Cuisines</div>
                    </div>
                    <ul className={style.ulContainerSearch}>
                        {props.cuisineMatch.map(cuisMatch => <div className={style.hoverOnSearch} onMouseEnter={props.handleHover}><div className={style.searchResultText}>{cuisMatch.cuisinename}</div></div>)}
                    </ul>
                </div> : <div></div>}
            </div>
            <div className={style.searchedSection}>
                {restaurantMatch.length !== 0 ? <div className={style.restaurantResults}>
                    <div className={style.searchCategoryTextContainer} onMouseEnter={props.handleHover}>
                        <i className={"material-icons" + ' ' + style.searchResultLogo}>store_mall_directory</i>
                        <div className={style.searchCategoryText}>Restaurants</div>
                    </div>
                    <ul className={style.ulContainerSearch}>
                        {props.restaurantMatch.map(restMatch => <div className={style.hoverOnSearch} onMouseEnter={props.handleHover}><div className={style.searchResultText}>{restMatch.restaurantname}</div></div>)}
                    </ul>
                </div> : <div></div>}
            </div>
        </div>
    )
}

export default SearchResults;