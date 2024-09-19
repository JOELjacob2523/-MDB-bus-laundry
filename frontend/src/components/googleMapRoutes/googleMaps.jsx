import "./googleMapRoutes.css";
import React, { useEffect, useState } from "react";
import { Button, Card, Divider, Modal, Select, message, Empty } from "antd";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import API from "../GoogleAPIKey";
import { MDBgetAllUserInfo } from "../../servers/mongoDB/studentRequests/getRequests";
import HandleDownloadRoutes from "./downloadedRoutes";

const { Option } = Select;

function Directions() {
  const map = useMap();
  const routesLibary = useMapsLibrary("routes");
  const [directionsService, setDirectionService] = useState(null);
  const [directionsRenderer, setDirectionRenderer] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [originInput, setOriginInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [students, setStudents] = useState([]);
  const [validAddresses, setValidAddresses] = useState([]);
  const [fastestRoute, setFastestRoute] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const studentData = await MDBgetAllUserInfo();
      setStudents(studentData);
      const addresses = studentData
        .map((student) => student.address2)
        .filter((address) => address);
      setValidAddresses(addresses);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!routesLibary || !map) return;
    setDirectionService(new routesLibary.DirectionsService());
    setDirectionRenderer(new routesLibary.DirectionsRenderer({ map }));
  }, [routesLibary, map]);

  const updateSelectedStudent = (addresses) => {
    // Ensure addresses is an array
    if (!Array.isArray(addresses)) {
      addresses = [addresses];
    }

    // Find all students matching the provided addresses
    const selectedStudents = students.filter((student) =>
      addresses.includes(student.address2)
    );

    // Set selected students (you might want to update state to store an array)
    setSelectedStudent(selectedStudents);
  };

  const handleOriginChange = (value) => {
    setOriginInput(value);
    updateSelectedStudent(value);
  };
  const handleDestinationChange = (value) => {
    setDestinationInput(value);
    updateSelectedStudent(value);
  };

  const handleWaypointChange = (value) => {
    setWaypoints(value);
    setSelectedStudent(value);
  };

  const calculateRoutes = () => {
    if (!directionsService || !originInput || !destinationInput) {
      message.error({
        type: "error",
        content: "Please select origin and destination.",
      });
      return;
    }

    const waypointsArray = waypoints.map((address) => ({
      location: address,
      stopover: true,
    }));
    directionsService
      .route({
        origin: originInput,
        destination: destinationInput,
        waypoints: waypointsArray,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        optimizeWaypoints: true,
      })
      .then((response) => {
        if (response.status === "OK") {
          setRoutes(response.routes);
          directionsRenderer.setDirections(response);
          message.open({
            type: "success",
            content: "Route calculeted successfully",
          });
        } else {
          console.error("Directions request failed:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error calculating directions:", error);
      });
  };

  useEffect(() => {
    if (!directionsRenderer) return;
    const directions = directionsRenderer.getDirections();
    if (directions) {
      directionsRenderer.setDirections(directions);
    }
  }, [directionsRenderer]);

  const normalizeAddress = (address) => {
    if (!address) return null;
    const normalized = address
      .trim()
      .toLowerCase()
      .replace(/[\s,]+/g, " ")
      .replace(/(unit|apt|floor|suite|ste|room|fl|#)\s*\d+/g, "")
      .replace(/\s+#\d+/g, "")
      .replace(/\s+usa$/, "")
      .replace(/, usa$/, "")
      .replace(/\s+/g, " ")
      .replace(/[^a-z0-9\s]/g, "");

    return normalized;
  };

  const findFastestRoute = () => {
    if (routes.length === 0) {
      message.error("No routes available to find the fastest route.");
      return;
    }

    let fastestRoute = routes[0];

    routes.forEach((route) => {
      if (
        route.legs &&
        route.legs[0].duration.value < fastestRoute.legs[0].duration.value
      ) {
        fastestRoute = route;
      }
    });

    if (!fastestRoute.legs) {
      message.error("No valid legs found in the routes.");
      return;
    }

    const originStudent = students.find(
      (student) => student.address2 === originInput
    );

    const destinationStudent = students.find(
      (student) => student.address2 === destinationInput
    );

    const waypointsStudents = waypoints
      .map((waypoint) =>
        students.find((student) => student.address2 === waypoint)
      )
      .filter((student) => student !== undefined);

    const routeWithStudentInfo = fastestRoute.legs.map((leg) => {
      const endStudent = students.find(
        (student) =>
          normalizeAddress(student.address2) ===
          normalizeAddress(leg.end_address)
      );

      return {
        ...leg,
        studentFirstName: endStudent ? endStudent.first_name : "Unknown",
        studentLastName: endStudent ? endStudent.last_name : "Unknown",
        studentPhone: endStudent ? endStudent.phone : "Unknown",
      };
    });

    const updatedFastestRoute = {
      ...fastestRoute,
      legs: routeWithStudentInfo,
      studentInfo: {
        originStudent,
        destinationStudent,
        waypointsStudents,
      },
    };

    setFastestRoute(updatedFastestRoute);
    showModal();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    await HandleDownloadRoutes({ fastestRoute });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Card
        title="Calculate Your Routes"
        size="small"
        className="google_maps_directions_container"
      >
        <div className="google_maps_calculation_container">
          <div className="google_maps_calculation_select">
            <Select
              placeholder="Select origin"
              value={originInput}
              onChange={handleOriginChange}
              style={{ width: 200, height: 60 }}
            >
              {students.map((student, index) =>
                student.address2 && student.address2.trim() !== "" ? (
                  <Option key={index} value={student.address2}>
                    <div>
                      {student.first_name} {student.last_name}
                    </div>
                    <div>{student.address2}</div>
                  </Option>
                ) : null
              )}
            </Select>

            <Select
              placeholder="Select destination"
              value={destinationInput}
              onChange={handleDestinationChange}
              style={{ width: 200, height: 60 }}
            >
              {students.map((student, index) =>
                student.address2 && student.address2.trim() !== "" ? (
                  <Option key={index} value={student.address2}>
                    <div>
                      {student.first_name} {student.last_name}
                    </div>
                    <div>{student.address2}</div>
                  </Option>
                ) : null
              )}
            </Select>
          </div>
          <div className="google_maps_calculation_multi_select">
            <Select
              mode="multiple"
              placeholder="Select waypoints..."
              value={waypoints}
              onChange={handleWaypointChange}
              style={{
                width: 400,
              }}
            >
              {students.map((student, index) =>
                student.address2 && student.address2.trim() !== "" ? (
                  <Option key={index} value={student.address2}>
                    <div>
                      {student.first_name} {student.last_name}
                    </div>
                    <div>{student.address2}</div>
                  </Option>
                ) : null
              )}
            </Select>
          </div>

          <div className="calculate_routes_btn_container">
            <Button
              type="primary"
              onClick={calculateRoutes}
              className="calculate_routes_btn"
            >
              Calculate Routes
            </Button>
          </div>
          <Divider orientation="left">Find Fastest Route Details</Divider>
          <div className="download_btn_container">
            <Button
              type="default"
              onClick={findFastestRoute}
              style={{ marginTop: 10 }}
            >
              Download Fastest Route
            </Button>
          </div>
        </div>
      </Card>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Download"
        width={600}
      >
        <div className="download_modal_container">
          <h3>Fastest Route</h3>
          {fastestRoute && fastestRoute.legs ? (
            fastestRoute.legs.map((leg, index) => (
              <div key={index} className="download_modal_inner">
                <Card title={`Route ${index + 1}`} size="small">
                  <div>
                    <div className="download_modal_card_inner">
                      <div>
                        {leg.studentFirstName} {leg.studentLastName}
                      </div>
                      <div>:נאמען</div>
                    </div>
                    <div className="download_modal_card_inner">
                      <div>
                        {leg.studentPhone.replace(
                          /^(\d{3})(\d{3})(\d{4})/,
                          "$1-$2-$3"
                        )}
                      </div>
                      <div>:טעל. נומער</div>
                    </div>
                  </div>

                  <div className="download_modal_card_inner">
                    <div> {leg.start_address}</div>
                    <div>:ארויספארן פון</div>
                  </div>
                  <div className="download_modal_card_inner">
                    <div> {leg.end_address}</div>
                    <div>:אנקומען צו</div>
                  </div>
                  <div className="download_modal_card_inner">
                    <div> {leg.distance.text}</div>
                    <div>:ווייט</div>
                  </div>
                  <div className="download_modal_card_inner">
                    <div> {leg.duration.text}</div>
                    <div>:צייט</div>
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <div>
              <Empty />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

const GoogleMaps = () => {
  const position = { lat: 41.34416, lng: -74.17183 };

  return (
    <div className="google_maps_container">
      <APIProvider apiKey={API.GOOGLE_MAPS_API_KEY}>
        <div className="google_maps_map_container">
          <Map
            defaultCenter={position}
            defaultZoom={15}
            fullscreenControl={false}
          >
            <div>
              <Directions />
            </div>
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};
export default GoogleMaps;
