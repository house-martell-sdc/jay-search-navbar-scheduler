import React from 'react';
import axios from 'axios';
import style from '../css/Search.css';
import DatePickerSearch from './DatePickerSearch.jsx';
import { timingSafeEqual } from 'crypto';
import SearchResults from './SearchResults.jsx';



class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            cityMatch: [],
            cuisineMatch: [],
            restaurantMatch: [],
            selectedDay: "Jan 4, 2019",
            selectedTime: "6:00 AM",
            selectedPartyCount: "1 Person",
            datePickerSearch: false,
            handleClick: this.props.handleClick,
            handleHoverState: true
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleClickSearch = this.handleClickSearch.bind(this);
        this.handleDaySelection = this.handleDaySelection.bind(this);
        this.handleHover = this.handleHover.bind(this);
    }
    handleInput(e) {
        this.setState({
            text: e.target.value
        }, () => {
            if (this.state.text.length > 1) {
                let searched = this.state.text;
                axios.get(`http://localhost:9004/api/search/${searched}`)
                    .then(data => {
                        let result = data.data;
                        this.setState({
                            cityMatch: result.cities.slice(0, 5),
                            cuisineMatch: result.cuisines.slice(0, 5),
                            restaurantMatch: result.restaurants.slice(0, 5)
                        })
                    })
                    .catch(err => console.log(err))
            } else {
                this.setState({
                    cityMatch: [],
                    cuisineMatch: [],
                    restaurantMatch: []
                })
            }
        })
    }
    handleClickSearch(e) {
        let name = e.target.id;
        this.setState({
            [name]: !this.state[name]
        })
    }
    handleDaySelection(day) {
        this.setState({
            selectedDay: day
        })
    }
    handleSelect(e) {
        let value = e.target.value;
        let name = e.target.id;
        this.setState({
            [name]: value
        })
    }
    handleHover() {
        this.setState({
            handleHoverState: false
        })
    }
    render() {

        let datePickerSearch = this.state.datePickerSearch;
        return (
            <div>
                <div className={style.searchContainer}>
                    {/* <div className={style.datepickerWrapper}>
                        <div className={style.datepickerSearchContainer}>
                            {datePickerSearch ? <DatePickerSearch handleClickSearch={this.handleClickSearch} handleDaySelection={this.handleDaySelection} /> : <div></div>}
                        </div>
                    </div> */}
                    <div className={style.searchCloseButtonContainer}>
                        <i id="searchClicked" onClick={this.state.handleClick} className={"material-icons" + ' ' + style.closeIcon}>close</i>
                    </div>
                    <div className={style.searchHeaderMessage}>
                        <div className={style.largeText}>Find your table for any occasion</div>
                    </div>
                    <div className={style.searchBottomComponents}>
                        <div className={style.pickerContainer}>
                            <div className={style.datePicker} id="datePickerSearch" onClick={this.handleClickSearch}>
                                <div className={style.datepickerWrapper}>
                                    <div className={style.datepickerSearchContainer}>
                                        {datePickerSearch ? <DatePickerSearch handleClickSearch={this.handleClickSearch} handleDaySelection={this.handleDaySelection} /> : <div></div>}
                                    </div> 
                                </div> 
                                <i id="datePickerSearch" onClick={this.handleClickSearch} className={"material-icons" + ' ' + style.searchDropLogo}>calendar_today</i>
                                <div id="datePickerSearch" onClick={this.handleClickSearch} className={style.datePickerInput}>{this.state.selectedDay}</div>
                                <i id="datePickerSearch" onClick={this.handleClickSearch} className={"material-icons" + ' ' + style.searchDropLogo}>keyboard_arrow_down</i>
                            </div>
                            <div className={style.timePicker}>
                                <div className={style.customSelectTime}>
                                    <i className={"material-icons" + ' ' + style.searchDropLogo}>access_time</i>
                                    <div className={style.currentSelectTime}>{this.state.selectedTime}</div>
                                    <i className={"material-icons" + ' ' + style.searchDropLogo}>keyboard_arrow_down</i>
                                </div>
                                <select id="selectedTime" onChange={this.handleSelect}>
                                    <option className={style.pickerText} value="12:00 AM">12:00 AM</option>
                                    <option className={style.pickerText} value="02:30 AM">12:30 AM</option>
                                    <option className={style.pickerText} value="1:00 AM">1:00 AM</option>
                                    <option className={style.pickerText} value="1:30 AM">1:30 AM</option>
                                    <option className={style.pickerText} value="2:00 AM">2:00 AM</option>
                                    <option className={style.pickerText} value="2:30 AM">2:30 AM</option>
                                    <option className={style.pickerText} value="3:00 AM">3:00 AM</option>
                                    <option className={style.pickerText} value="3:30 AM">3:30 AM</option>
                                    <option className={style.pickerText} value="4:00 AM">4:00 AM</option>
                                    <option className={style.pickerText} value="4:30 AM">4:30 AM</option>
                                    <option className={style.pickerText} value="5:00 AM">5:00 AM</option>
                                    <option className={style.pickerText} value="5:30 AM">5:30 AM</option>
                                    <option className={style.pickerText} value="6:00 AM">6:00 AM</option>
                                    <option className={style.pickerText} value="6:30 AM">6:30 AM</option>
                                    <option className={style.pickerText} value="7:00 AM">7:00 AM</option>
                                    <option className={style.pickerText} value="7:30 AM">7:30 AM</option>
                                    <option className={style.pickerText} value="8:00 AM">8:00 AM</option>
                                    <option className={style.pickerText} value="8:30 AM">8:30 AM</option>
                                    <option className={style.pickerText} value="9:00 AM">9:00 AM</option>
                                    <option className={style.pickerText} value="9:30 AM">9:30 AM</option>
                                    <option className={style.pickerText} value="10:00 AM">10:00 AM</option>
                                    <option className={style.pickerText} value="10:30 AM">10:30 AM</option>
                                    <option className={style.pickerText} value="11:00 AM">11:00 AM</option>
                                    <option className={style.pickerText} value="11:30 AM">11:30 AM</option>
                                    <option className={style.pickerText} value="12:00 PM">12:00 PM</option>
                                    <option className={style.pickerText} value="12:30 PM">12:30 PM</option>
                                    <option className={style.pickerText} value="1:00 PM">1:00 PM</option>
                                    <option className={style.pickerText} value="1:30 PM">1:30 PM</option>
                                    <option className={style.pickerText} value="2:00 PM">2:00 PM</option>
                                    <option className={style.pickerText} value="2:30 PM">2:30 PM</option>
                                    <option className={style.pickerText} value="3:00 PM">3:00 PM</option>
                                    <option className={style.pickerText} value="3:30 PM">3:30 PM</option>
                                    <option className={style.pickerText} value="4:00 PM">4:00 PM</option>
                                    <option className={style.pickerText} value="4:30 PM">4:30 PM</option>
                                    <option className={style.pickerText} value="5:00 PM">5:00 PM</option>
                                    <option className={style.pickerText} value="5:30 PM">5:30 PM</option>
                                    <option className={style.pickerText} value="6:00 PM">6:00 PM</option>
                                    <option className={style.pickerText} value="6:30 PM">6:30 PM</option>
                                    <option className={style.pickerText} value="7:00 PM">7:00 PM</option>
                                    <option className={style.pickerText} value="7:30 PM">7:30 PM</option>
                                    <option className={style.pickerText} value="8:00 PM">8:00 PM</option>
                                    <option className={style.pickerText} value="8:30 PM">8:30 PM</option>
                                    <option className={style.pickerText} value="9:00 PM">9:00 PM</option>
                                    <option className={style.pickerText} value="9:30 PM">9:30 PM</option>
                                    <option className={style.pickerText} value="20:00 PM">10:00 PM</option>
                                    <option className={style.pickerText} value="20:30 PM">10:30 PM</option>
                                    <option className={style.pickerText} value="21:00 PM">11:00 PM</option>
                                    <option className={style.pickerText} value="21:30 PM">11:30 PM</option>
                                </select>
                            </div>
                            <div className={style.partyCount}>
                                <div className={style.customPartyCount}>
                                    <i className={"material-icons" + ' ' + style.searchDropLogo}>person</i>
                                    <div className={style.currentPartyCount}>{this.state.selectedPartyCount}</div>
                                    <i className={"material-icons" + ' ' + style.searchDropLogo}>keyboard_arrow_down</i>
                                </div>
                                <select id="selectedPartyCount" onChange={this.handleSelect}>
                                    <option className={style.pickerText} value="1 person">1 person</option>
                                    <option className={style.pickerText} value="2 person">2 person</option>
                                    <option className={style.pickerText} value="3 person">3 person</option>
                                    <option className={style.pickerText} value="4 person">4 person</option>
                                    <option className={style.pickerText} value="5 person">5 person</option>
                                    <option className={style.pickerText} value="6 person">6 person</option>
                                    <option className={style.pickerText} value="7 person">7 person</option>
                                    <option className={style.pickerText} value="8 person">8 person</option>
                                    <option className={style.pickerText} value="9 person">9 person</option>
                                    <option className={style.pickerText} value="10 person">10 person</option>
                                    <option className={style.pickerText} value="11 person">11 person</option>
                                    <option className={style.pickerText} value="12 person">12 person</option>
                                    <option className={style.pickerText} value="13 person">13 person</option>
                                    <option className={style.pickerText} value="14 person">14 person</option>
                                    <option className={style.pickerText} value="15 person">15 person</option>
                                    <option className={style.pickerText} value="16 person">16 person</option>
                                    <option className={style.pickerText} value="17 person">17 person</option>
                                    <option className={style.pickerText} value="18 person">18 person</option>
                                    <option className={style.pickerText} value="19 person">19 person</option>
                                    <option className={style.pickerText} value="20 person">20 person</option>
                                    <option className={style.pickerText} value="Larger party">Larger party</option>
                                </select>
                            </div>
                        </div>
                        <div className={style.searchBar}>
                            {this.state.text.length > 1 ? <SearchResults handleHoverState = {this.state.handleHoverState} handleHover = {this.handleHover} text={this.state.text} cityMatch={this.state.cityMatch} cuisineMatch={this.state.cuisineMatch} restaurantMatch={this.state.restaurantMatch} /> : <div></div>}

                            <div className={style.customSearchBar}>
                                <i className={"material-icons" + ' ' + style.searchDropLogo}>search</i>
                            </div>
                            <input id="kadsfjwefiw99" className={style.searchInput} onChange={this.handleInput} placeholder="Location, Restaurant, or Cuisine"></input>
                        </div>

                        <div className={style.searchFindTableButtonContainer}>
                            <button className={style.searchFindTableButton}>Find a Table</button>
                        </div>

                    </div>
                </div>
            </div >
        )
    }
}

export default Search;