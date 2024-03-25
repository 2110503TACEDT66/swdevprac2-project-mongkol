  'use client'
  import { useReducer } from "react";
  import Card from "./Card";
  import Link from "next/link";


  export default function CardPanel() {

        const initMap = new Map([
          ['Chulalongkorn Hospital', 5],
          ['Rajavithi Hospital', 5],
          ['Thammasat University Hospital', 5],
      ]);
  
      const showRatingReducer = (ratingList: Map<string, number>, action: {type: string; hospitalName: string; rating: number}) => {
          switch (action.type) {
              case 'SET_RATING':
                  const updatedRatings = new Map(ratingList);
                  updatedRatings.set(action.hospitalName, action.rating);
                  return updatedRatings;
              case 'REMOVE_RATING':
                  const newRatings = new Map(ratingList);
                  newRatings.delete(action.hospitalName);
                  return newRatings;
              default:
                  return ratingList;
          }
      }

      const mockHospitalList = [
        {hid: "001", name:"Chulalongkorn Hospital", imgSrc: "/img/chula.jpg"},
        {hid: "002", name:"Rajavithi Hospital", imgSrc: "/img/rajavithi.jpg"},
        {hid: "003", name:"Thammasat University Hospital", imgSrc: "/img/thammasat.jpg"}
    ]

      const [ratingList, dispatchRating] = useReducer(showRatingReducer, initMap);

      const handleRatingChange = (hospitalName: string, rating: number) => {
          dispatchRating({ type: 'SET_RATING', hospitalName, rating });
      };

      const handleRemoveRating = (hospitalName: string) => {
          dispatchRating({ type: 'REMOVE_RATING', hospitalName , rating: 0});
      };

    return (
        <div>
            <div style={{ margin: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around" }}>
                {mockHospitalList.map((hospitalItem) => (
                    <Link href= {`/hospital/${hospitalItem.hid}`} className="w-1/5">
                        <Card hospitalName={hospitalItem.name} imgSrc={hospitalItem.imgSrc} onRating={handleRatingChange} ratingList={ratingList}/>
                    </Link>
                ))}
            </div>
            <div className="text-center pt-6 pb-6" >
                {Array.from(ratingList).map(([hospitalName, rating]: [string, number]) => (
                    <div key={hospitalName} data-testid={hospitalName} onClick={() => handleRemoveRating(hospitalName)}>
                        {hospitalName} Rating: {rating}
                    </div>
                ))}
            </div>
        </div>
    );
}
