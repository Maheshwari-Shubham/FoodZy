import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
import API_BASE_URL from '../api'

export default function Home() {

    const [search, setSearch] = useState('');
    const [foodCat, setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);

    const loadData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/foodData`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`Food data request failed with status ${response.status}`);
            }

            const data = await response.json();
            if (!Array.isArray(data) || !Array.isArray(data[0]) || !Array.isArray(data[1])) {
                throw new Error('Food data response has an invalid format');
            }
            setfoodItem(data[0]);
            setfoodCat(data[1]);
        } catch (error) {
            console.error('Unable to load food data:', error);
        }
    }


    useEffect(() => {
        loadData()
    }, [])




    return (
        <div>
            <div> <Navbar /> </div>
            <div> <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            {/*<button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>*/}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://plus.unsplash.com/premium_photo-1684534125661-614f59f16f2e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2Vyc3xlbnwwfHwwfHx8MA%3D%3D" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=k60TjxKIOIxJpd4F4yLMVjsniB4W1BpEV4Mi_nb4uJU=" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://t3.ftcdn.net/jpg/06/16/85/60/360_F_616856040_zCvPMQkPFOWsVb3Hxo7mQUYzlzciFCZs.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div> </div>
            <div className='container'>
                {
                    foodCat.length > 0
                        ? foodCat.map((data) => {
                            return (
                                <section key={data._id} className='food-category mb-5'>
                                    <div className='fs-3 mb-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    <div className='row g-5'>
                                        {foodItem.length > 0
                                            ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                            .map(filterItems => {
                                                return (
                                                    <div key={filterItems._id} className='col-12 col-sm-6 col-lg-3 d-flex justify-content-center'>
                                                        <Cards foodItem = {filterItems}
                                                            options={filterItems.options[0]}                                                           
                                                        ></Cards>
                                                    </div>
                                                )
                                            })
                                            : <div> No Such Data Found </div>
                                        }
                                    </div>
                                </section>
                            )
                        })
                        : <div>""""""""""</div>
                }

            </div>

            <div> <Footer /> </div>
        </div>
    )
}
