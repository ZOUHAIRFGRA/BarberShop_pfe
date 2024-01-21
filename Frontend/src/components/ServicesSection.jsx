import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const ServicesSection = ({image,name,city,rating,reviewCount,address,services}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="col-md-8 col-sm-12">
            <div style={{ position: "relative" }}>
              <img
                className="d-block w-100"
                src={image}
                alt={`${name} - ${city}`}
              />

              <span
                className="card-notify-year"
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  background: " rgba(0,0,0,.5)",
                  padding: "11px 16px",
                  borderRadius: "0 6px",
                  lineHeight: "24px",
                  alignItems: "center",
                  border: "none",
                  display: "inline-flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  pointerEvents: "none",
                  fontFamily: "ProximaNova-Regular",
                }}
              >
                <div
                  style={{
                    color: "#fff",
                    fontSize: "30px",
                    lineHeight: "34px",
                    letterSpacing: 0,
                    fontFamily: "ProximaNova-Bold",
                  }}
                >
                  {rating}
                </div>
                <div
                  style={{
                    color: "#fff",
                    fontSize: "14px",
                    wordWrap: "break-word",
                    letterSpacing: 0,
                    lineHeight: "16px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    width: "100%",
                    fontFamily: "Roboto",
                  }}
                >
                  {reviewCount} reviews
                </div>
              </span>
            </div>

            <h2 className="pt-5 ">{name}</h2>
            <p className="pb-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {address}
            </p>
            <div className="form-group row">
              <label htmlFor="inputSearch" className="col-sm-2 col-form-label">
                Services:
              </label>
              <div className="col-sm-10">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div className="accordion" id="accordionPanelsStayOpenExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseOne"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne"
                  ></button>
                </h2>
                <div
                  id="panelsStayOpen-collapseOne"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <table className="table">
                      <thead></thead>
                      <tbody>
                        {filteredServices.map((service, index) => (
                          <tr key={index}>
                            <th scope="row">{service.name}</th>
                            <td>${service.price}</td>
                            <td>{service.duration}</td>
                            <td>
                              <button type="submit" className="btn btn-primary">
                                Book
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="space" style={{ height: "24px" }}></div>
          </div>
  )
}

export default ServicesSection