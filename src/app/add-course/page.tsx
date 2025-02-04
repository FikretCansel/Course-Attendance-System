"use client";
import { useEffect, useState, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import { auth, db } from "@/Firebase";
import { addDoc, collection, GeoPoint } from "firebase/firestore";
import { importReaflet } from "@/lib/react-leaflet";
import { useAuthState } from "react-firebase-hooks/auth";
import { DragEndEvent } from "leaflet";
const { MapContainer, Marker, Popup, TileLayer } = importReaflet();

export default function DraggableMarkerMap() {
  const ref = collection(db, "linkCourses");
  const [user, loading, error] = useAuthState(auth)
  const [validationError, setValidationError] = useState("")
  
  const [position, setPosition] = useState({ lat: 36.41425, lng: 34.06211 });
  const [inputValues, setInputValues] = useState({
    lat: 36.41425,
    lng: 34.06211,
    courseName: "",
    teacherName: "",
    radius: 0,
  });


  const [LIcon, setLIcon] = useState<{ userIcon: any; targetIcon: any }>({
    userIcon: null,
    targetIcon: null,
  });

  const handleSubmitAddCourse = useCallback(async () => {
    if(!user?.uid){
      console.log('user Id bulunamadı')
      setValidationError('User Not found');
      return;
    }
    try {
      await addDoc(ref, {
        courseName: inputValues.courseName,
        courseTeacher: inputValues.teacherName,
        geolocation: new GeoPoint(position.lat, position.lng),
        radius: Number(inputValues.radius),
        userId: user?.uid
      });
      setInputValues({
        ...inputValues,
        courseName: "",
        teacherName: "",
        lat: position.lat,
        lng: position.lng,
        radius: 0,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }, [inputValues, position.lat, position.lng, ref, user?.uid]);

  useEffect(() => {
    import("leaflet").then((mod) => {
      const userIcon = new mod.default.Icon({
        iconUrl:
          "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });
      const targetIcon = new mod.default.Icon({
        iconUrl:
          "https://cdn1.iconfinder.com/data/icons/web-55/32/web_1-512.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });
      setLIcon({ userIcon, targetIcon });
    });
  }, []);

  const updatePosition = (e: DragEndEvent) => {
    const newLat = e.target.getLatLng().lat;
    const newLng = e.target.getLatLng().lng;
    setPosition({ lat: newLat, lng: newLng });
    setInputValues({ ...inputValues, lat: newLat, lng: newLng });
  };

  const MapClickHandler = () => {
    return null;
  };

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", inputValues);
    handleSubmitAddCourse(); // Add course data to Firestore
  };

  return (
    <div>
      <div>
        <div className="columns ">
          <div className="is-5 ml-3">
            <div className="flex flex-col mt-5  m-3 h-screen">
              <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Course Add Form
                </h2>
                <div className="basis-1/4"></div>

                <form onSubmit={handleSubmit} className="flex flex-col">
                  <table>
                    <tbody>
                      <tr>
                        <th>
                          <label className="basis-1/6 font-semibold">
                            Course Name
                          </label>
                        </th>
                        <td>
                          <input
                            type="text"
                            className="basis-5/6 bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            name="courseName"
                            value={inputValues.courseName}
                            onChange={handleChange}
                            required
                            placeholder="Course Name"
                          />
                        </td>
                      </tr>

                      <tr>
                        <th>
                          <label className="basis-1/6 font-semibold">
                            Teacher Name
                          </label>
                        </th>
                        <td>
                          <input
                            type="text"
                            className="basis-5/6 bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            name="teacherName"
                            value={inputValues.teacherName}
                            onChange={handleChange}
                            required
                            placeholder="Teacher Name"
                          />
                        </td>
                      </tr>

                      <tr>
                        <th>
                          <label className="basis-1/6 font-semibold">Lat</label>
                        </th>
                        <td>
                          <input
                            type="text"
                            className="basis-5/6 bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            name="lat"
                            value={inputValues.lat}
                            readOnly
                            placeholder="Latitude"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <label className="basis-1/6 font-semibold">
                            Long
                          </label>
                        </th>
                        <td>
                          <input
                            type="text"
                            className="basis-5/6 bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            name="lng"
                            value={inputValues.lng}
                            readOnly
                            placeholder="Longitude"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <label className="basis-1/6 font-semibold">
                            Radius
                          </label>
                        </th>
                        <td>
                          <input
                            type="Number"
                            step="0.01"
                            className="basis-5/6 bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            name="radius"
                            value={inputValues.radius}
                            onChange={handleChange}
                            placeholder="Radius"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    type="submit"
                    className="basis-5/6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                  >
                    Add Course
                  </button>
                </form>
                {validationError && <p className="text-red-500">{validationError}</p>}
              </div>
            </div>
          </div>
          <div className="column is-three-quarters">
            {/* Map */}
            <MapContainer
              center={[position.lat, position.lng]}
              zoom={13}
              style={{ height: "100vh", width: "100vw" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[position.lat, position.lng]}
                draggable={true}
                eventHandlers={{
                  dragend: updatePosition,
                }}
                icon={LIcon.targetIcon}
              >
                <Popup>Current location</Popup>
              </Marker>

              <MapClickHandler />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
