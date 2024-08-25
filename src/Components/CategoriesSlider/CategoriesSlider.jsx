import React , {useState , useEffect} from 'react'
import Slider from "react-slick";
import axios from 'axios'
export default function CategoriesSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: false,
        autoplay:true,
        autoplaySpeed:2000,
        responsive: [
          {
              breakpoint: 1024,
              settings: {
                  slidesToShow: 4,
              }
          },
          {
              breakpoint: 600,
              settings: {
                  slidesToShow: 2,
              }
          }
      ]
      };
      const [categories,setCategories] = useState([])
      async function getRecentcategories(){
        try{
          let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
          setCategories(data.data)
        }
        catch(err){
          console.log(err);
        }
      }
      useEffect(()=>{
        getRecentcategories()
      })
  return <>
    <Slider {...settings}>
        {categories?.map((category , index)=> <div key={index}>
    <img src={category.image} className='w-full h-[200px] mt-4' alt="" />
    <h3 className='sm:text-lg'>{category.name}</h3>
  </div>)}
    </Slider>
  </>  
}