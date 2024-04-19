import { useEffect, useState, useContext } from 'react';
import SafeSpaceLogoBanner from '../../../../components/SafeSpaceLogoBanner';
import { useRouter } from 'next/router';
import { GlobalContext } from '../../../utils/globalContext';
import { doctors} from '../../../../mocks/mock_doctors_list.json';

export default function DoctorsNearby() {
  const router = useRouter();
  const { query } = router;
  const { requestConfig } = useContext(GlobalContext);
  const searchString = `${query.find} near me`;
  console.log('vineet search', searchString);
  const [preNavigation, setPreNavigation] = useState(true);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [doctorsList, setDoctorsList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setPreNavigation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    setTimeout(() => getLocation(), 2000);
  }, [])

  useEffect(() => {
    const fetchDoctorsNearby = async () => {
      try {
        setLoading(true);
        const postData = {
          "latitude": latitude,
          "longitude": longitude,
          "searchText": searchString
        }
        console.log('vineet post request', postData)
        const res = await fetch(`${requestConfig.url}getdoctorsnearby`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any other headers as needed
            'Accept': '*/*',
          },
          body: JSON.stringify(postData),
        });
    
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
      
        const data = await res.json();
        console.log('vineet data here', data);
        setLoading(false);
      } catch (error: any) {
        setError(`Unable to get the list of doctors nearby: ${error.message}`);
        setLoading(false);
      }
    }
    if (latitude !==0 &&  longitude !==0 && !preNavigation ) {
      fetchDoctorsNearby();
    }
  }, [preNavigation, latitude, longitude]);

  return (
    <div className="flex flex-col items-center justify-start pt-10 bg-gradient-to-r from-background-start-rgb to-background-end-rgb min-h-screen">
      <SafeSpaceLogoBanner />
      {preNavigation && (
        <>
          <p className="mt-[10rem] text-xl text-center mt-[1rem] px-[10rem]">{`It appears that your mental well-being may not be at its best. Kindly allow access to your location so that I can provide you with a list of nearby doctors.`}</p>
        </>
      )
      }
      {
        !preNavigation && (
          <>
          {
            loading ? (
            <>
              <span className="mt-[10rem] loading loading-infinity loading-lg"> </span>
              <p>Hang on tight, we are getting the list of doctors for you</p>
            </>) :
            (
              <>
                <p className="text-xl text-center mt-[1rem] px-[10rem]">{`Below are the list of ${query.find} near your location`}</p>
                <div className="overflow-x-auto max-h-[60vh] mt-[2rem]">
                  <table className="table table-pin-rows">
                    {/* head */}
                    <thead>
                      <tr className='bg-[#13072E]'>
                        <th className='text-[#fff]'>Name</th>
                        <th className='text-[#fff]'>Address</th>
                        <th className='text-[#fff]'>Phone number</th>
                      </tr>
                    </thead>
                    <tbody>
                     {
                      doctors.places.map((curr, index) => {
                        
                        return (<tr key={index}>
                          <td>
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-bold">{curr.displayName.text}</div>
                                <div className="text-sm opacity-50">United States</div>
                              </div>
                            </div>
                          </td>
                          <td><p>{curr.formattedAddress}</p></td>
                          <td>
                           {curr.internationalPhoneNumber}
                          </td>
                        </tr>)
                      })
                     }
                    </tbody>
                  </table>
                </div>
                  <a onClick={() => router.push('/help/resources')} className="mt-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Also checkout some of our resources to improve you mental health
                  </a>
              </>

            ) 
          }
          </>
        )
      }
    </div>
  );
}