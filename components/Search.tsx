import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker/dist/entry.nostyle";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

const Search = () => {
  const [startDatetime, setStartDatetime] = useState(new Date());
  const [endDatetime, setEndDatetime] = useState(new Date());
  const [guests, setGuests] = useState("10");

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(
      `/?start=${moment(startDatetime).toISOString()}&end=${moment(
        endDatetime
      ).toISOString()}${guests !== "" ? "&guests=" + guests : ""}`
    );
  };

  const onDateRangeChange = useCallback(([start, end]) => {
    setStartDatetime(start);
    setEndDatetime(end);
  }, []);

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h2 className="mb-3">Find Available Rooms</h2>
            <div className="form-group">
              <label htmlFor="DateTime_field">Time</label>
              <DateTimeRangePicker
                minDate={new Date()}
                className="form-control"
                onChange={onDateRangeChange}
                value={[startDatetime, endDatetime]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="guest_field">Capacity</label>
              <select
                className="form-control"
                id="guest_field"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                {[10, 20, 30, 40, 50, 100].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-block py-2">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
