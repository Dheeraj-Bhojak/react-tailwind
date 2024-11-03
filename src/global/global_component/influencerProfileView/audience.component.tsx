import React, { useState, useCallback, ChangeEvent, useEffect } from "react";

import leftArrow from "../../../assets/img/leftArrow.png";
import rightArrow from "../../../assets/img/rightArrow.png";

import { Chart } from "react-google-charts";
import AgeGenderBarGraph from "../graphAndChart/ageGenderBarGraph.component";
import GenderDoughnutChart from "../graphAndChart/genderDoughnutChart.component";
import AgeColumnChart from "../graphAndChart/ageColumnChart.component";
import ProgressBarComponent from "../graphAndChart/progressBar.component";
import {
  AudienceInterface,
  LocationInterface,
  AudienceDemographyInterface,
} from "../../../marketer/pages/InfluencerProfile/profieResult";
import { stateCodeMapping } from "../../../seeder";
import _ from "lodash";
import { cardVisibleInterface } from "../../../marketer/pages/InfluencerProfile/influencerProfileView.page";

interface AudienceDataInterface {
  audience: AudienceInterface;
  handleShowCards: (cardName: keyof cardVisibleInterface) => void;
  cardVisible: cardVisibleInterface;
}
interface StateValues {
  [key: string]: number;
}
interface PercentDataResult {
  name: string;
  progressValue: number;
}

const Audience: React.FC<AudienceDataInterface> = ({
  audience,
  handleShowCards,
  cardVisible,
}) => {
  const geoData = [["Country", "Popularity"]];

  const [cityData, setCityData] = useState<PercentDataResult[] | null>(null);
  const [stateData, setStateData] = useState<PercentDataResult[] | null>(null);
  const [mapState, setMapState] = useState(null);
  useEffect(() => {
    const [stateValue, citiesValue] = findStatePercentValue(audience.locations);
    setStateData(stateValue);
    setCityData(citiesValue);
  }, []);

  const formattedData =
    stateData &&
    stateData.map(({ name, progressValue }) => [
      stateCodeMapping[name as keyof typeof stateCodeMapping],
      progressValue,
    ]);
  const concatenatedArray = _.concat(geoData, formattedData);

  const optionsWorld = {
    domain: "IN",
    colorAxis: { colors: ["#fdc100"] },
    backgroundColor: "#fff",
    defaultColor: "#909AAA",
  };

  const optionsIN = {
    region: "IN",
    domain: "IN",
    displayMode: "regions",
    resolution: "provinces",

    colorAxis: {
      colors: [
        "#fdc100",
        "#e9b714",
        "#d4ad27",
        "#bfa33b",
        "#aa994e",
        "#958f62",
        "#808576",
        "#6b7b8a",
        "#56719e",
        "#4b6ca9",
        "#4267B2",
      ],
    },
    backgroundColor: "#fff",
    defaultColor: "#909AAA",
  };

  const [currentCityPage, setCurrentCityPage] = useState(0);
  const [currentStatePage, setCurrentStatePage] = useState(0);
  const citiesPerPage = 5;
  const statesPerPage = 5;
  const totalPages = Math.ceil((cityData?.length ?? 0) / citiesPerPage);
  const totalPagesState = Math.ceil((stateData?.length ?? 0) / statesPerPage);

  const nextCityPage = useCallback(() => {
    setCurrentCityPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  }, [setCurrentCityPage, totalPages]);

  const prevCityPage = useCallback(() => {
    setCurrentCityPage((prevPage) => Math.max(prevPage - 1, 0));
  }, [setCurrentCityPage]);

  const visibleCities =
    cityData &&
    cityData.slice(
      currentCityPage * citiesPerPage,
      (currentCityPage + 1) * citiesPerPage
    );
  const nextStatePage = () => {
    setCurrentStatePage((prevPage) =>
      Math.min(prevPage + 1, totalPagesState - 1)
    );
  };

  const prevStatePage = () => {
    setCurrentStatePage((prevPage) => Math.max(prevPage - 1, 0));
  };
  const visibleStates =
    stateData &&
    stateData.slice(
      currentStatePage * statesPerPage,
      (currentStatePage + 1) * statesPerPage
    );

  const [selectedMap, setSelectedMap] = useState<string>("world");

  const handleMapChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedMap(event.target.value);
  };

  const findStatePercentValue = (
    data: LocationInterface[]
  ): [PercentDataResult[], PercentDataResult[]] => {
    const totalValue = data.reduce((sum, item) => sum + item.value, 0);
    const valuesByState = data.reduce((acc: StateValues, item) => {
      if (!acc[item.state]) {
        acc[item.state] = 0;
      }
      acc[item.state] += item.value;
      return acc;
    }, {} as StateValues);
    const stateValue = calculateValueWithPercent(valuesByState, totalValue);
    stateValue.sort((a, b) => b.progressValue - a.progressValue);
    const valuesByCities = data.reduce((acc: StateValues, item) => {
      if (!acc[item.city]) {
        acc[item.city] = 0;
      }
      acc[item.city] += item.value;
      return acc;
    }, {} as StateValues);
    const citiesValue = calculateValueWithPercent(valuesByCities, totalValue);
    citiesValue.sort((a, b) => b.progressValue - a.progressValue);
    return [stateValue, citiesValue];
  };

  const calculateValueWithPercent = (
    objectValue: StateValues,
    totalValue: number
  ) => {
    return Object.keys(objectValue).map((state) => ({
      name: state,
      progressValue: parseFloat(
        ((objectValue[state] / totalValue) * 100).toFixed(2)
      ),
    }));
  };
  const ageGroups = [
    "<13",
    "13-17",
    "18-24",
    "25-34",
    "35-44",
    "45-54",
    "55-64",
    "65+",
  ];
  const extractData = (prefix: string): number[] => {
    return ageGroups.map(
      (ageGroup) =>
        audience.audience[
          `${prefix}_${ageGroup}` as keyof AudienceDemographyInterface
        ]
    );
  };

  const maleData = extractData("male");
  const femaleData = extractData("female");

  const ageHorizontalValues = () => {
    return maleData.map((male, indx) => male + femaleData[indx]);
  };

  const othersData = extractData("other");

  return (
    <div id="audience" className="bg-[#ebebeb]">
      <div className="md:flex">
        <div className="md:w-6/12">
          <div className="bg-white rounded-lg ml-4 p-4 mr-4 md:mr-2 overflow-hidden">
            <div>
              <p className="text-gray-color font-medium text-sm md:text-base 2xl:text-lg">
                Age & Gender
              </p>
            </div>
            {cardVisible.ageAndGender ? (
              <div>
                <AgeGenderBarGraph
                  ageData={ageGroups}
                  maleData={maleData}
                  femaleData={femaleData}
                  othersData={othersData}
                />
              </div>
            ) : (
              <div className="relative w-full">
                <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                  <button
                    className="text-gray-700 text-sm bg-white px-4 py-2 rounded-full shadow-lg z-10"
                    onClick={() => handleShowCards("ageAndGender")}>
                    Show Example <i className="fa-solid fa-lock text-sm"></i>
                  </button>
                </div>
                <div className="blur">
                  <AgeGenderBarGraph
                    ageData={ageGroups}
                    maleData={maleData}
                    femaleData={femaleData}
                    othersData={othersData}
                  />
                </div>
              </div>
            )}
            <div></div>
          </div>
        </div>

        <div className="md:w-6/12 md:flex">
          <div className="bg-white md:w-1/2 p-4 rounded-lg ml-4 md:ml-2 mr-4 md:mr-2 overflow-hidden mt-[16px] md:mt-0">
            <div>
              <p className="text-gray-color font-medium text-sm md:text-base 2xl:text-lg">
                Gender
              </p>
              {cardVisible.gender ? (
                <div>
                  <GenderDoughnutChart
                    maleData={audience.audience.male}
                    femaleData={audience.audience.female}
                    othersData={audience.audience.other}
                  />
                </div>
              ) : (
                <div className="relative w-full">
                  <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                    <button
                      className="text-gray-700 text-sm bg-white px-4 py-2 rounded-full shadow-lg z-10"
                      onClick={() => handleShowCards("gender")}>
                      Show Example <i className="fa-solid fa-lock text-sm"></i>
                    </button>
                  </div>
                  <div className="blur">
                    <GenderDoughnutChart
                      maleData={audience.audience.male}
                      femaleData={audience.audience.female}
                      othersData={audience.audience.other}
                    />
                  </div>
                </div>
              )}
              <div></div>
            </div>
          </div>
          <div className="bg-white md:w-1/2 p-3 rounded-lg ml-4 md:ml-2 mr-4 overflow-hidden mt-[16px] md:mt-0">
            <div>
              <p className="text-gray-color font-medium text-sm md:text-base 2xl:text-lg">
                Age
              </p>
              <div>
                {cardVisible.age ? (
                  <div>
                    <AgeColumnChart horizontalAgeData={ageHorizontalValues()} />
                  </div>
                ) : (
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                      <button
                        className="text-gray-700 text-sm bg-white px-4 py-2 rounded-full shadow-lg z-10"
                        onClick={() => handleShowCards("age")}>
                        Show Example{" "}
                        <i className="fa-solid fa-lock text-sm"></i>
                      </button>
                    </div>
                    <div className="blur">
                      <AgeColumnChart
                        horizontalAgeData={ageHorizontalValues()}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex ml-4 mt-3">
        <div className="md:w-3/12 mr-[16px] md:mr-0">
          <div className="rounded-lg p-4 w-full bg-white h-[300px] xl:h-[300px] 2xl:h-[339px]">
            <div className="flex">
              <div className="w-1/2">
                <p className="text-gray-color font-medium text-sm md:text-base 2xl:text-lg mb-2">
                  City
                </p>
              </div>
              <div className="w-1/2 justify-end flex">
                <button
                  className="w-5 h-5 xl:w-5 xl:h-5 2xl:w-7 2xl:h-7 bg-white border-[#eaeaea] shadow-sm border rounded-full mr-4 items-center justify-center flex"
                  onClick={prevCityPage}>
                  <img
                    className="w-2 h-2 xl:w-2 xl:h-2 2xl:w-3 2xl:h-3"
                    src={leftArrow}
                    alt=""
                  />
                </button>
                <button
                  className="w-5 h-5 xl:w-5 xl:h-5 2xl:w-7 2xl:h-7 bg-white border-[#eaeaea] shadow-sm border rounded-full items-center justify-center flex"
                  onClick={nextCityPage}>
                  <img
                    className="w-2 h-2 xl:w-2 xl:h-2 2xl:w-3 2xl:h-3"
                    src={rightArrow}
                    alt=""
                  />
                </button>
              </div>
            </div>
            {cardVisible.city ? (
              <div>
                {visibleCities &&
                  visibleCities.map((city, index) => (
                    <ProgressBarComponent
                      key={index}
                      name={city.name}
                      progressValue={city.progressValue}
                      color="ri-blue"
                    />
                  ))}
              </div>
            ) : (
              <div className="relative w-full">
                <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                  <button
                    className="text-gray-700 text-sm bg-white px-4 py-2 rounded-full shadow-lg z-10"
                    onClick={() => handleShowCards("city")}>
                    Show Example <i className="fa-solid fa-lock text-sm"></i>
                  </button>
                </div>
                <div className="blur">
                  {visibleCities &&
                    visibleCities.map((city, index) => (
                      <ProgressBarComponent
                        key={index}
                        name={city.name}
                        progressValue={city.progressValue}
                        color="ri-blue"
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
          <div className="bg-white mt-3 rounded-lg p-4 w-full h-[300px] xl:h-[300px] 2xl:h-[339px] mb-3">
            <div className="flex">
              <div className="w-1/2 ">
                <p className="text-gray-color font-medium text-sm md:text-base 2xl:text-lg mb-2">
                  State
                </p>
              </div>
              <div className="w-1/2 justify-end flex">
                <button
                  className="w-5 h-5 xl:w-5 xl:h-5 2xl:w-7 2xl:h-7 bg-white border-[#eaeaea] shadow-sm border rounded-full mr-4 items-center justify-center flex"
                  onClick={prevStatePage}>
                  <img
                    className="w-2 h-2 xl:w-2 xl:h-2 2xl:w-3 2xl:h-3"
                    src={leftArrow}
                    alt=""
                  />
                </button>
                <button
                  className="w-5 h-5 xl:w-5 xl:h-5 2xl:w-7 2xl:h-7 bg-white border-[#eaeaea] shadow-sm border rounded-full items-center justify-center flex"
                  onClick={nextStatePage}>
                  <img
                    className="w-2 h-2 xl:w-2 xl:h-2 2xl:w-3 2xl:h-3"
                    src={rightArrow}
                    alt=""
                  />
                </button>
              </div>
            </div>
            {cardVisible.state ? (
              <div>
                {visibleStates &&
                  visibleStates.map((state, index) => (
                    <ProgressBarComponent
                      key={index}
                      name={state.name}
                      progressValue={state.progressValue}
                      color="ri-orange"
                    />
                  ))}
              </div>
            ) : (
              <div className="relative w-full">
                <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                  <button
                    className="text-gray-700 text-sm bg-white px-4 py-2 rounded-full shadow-lg z-10"
                    onClick={() => handleShowCards("state")}>
                    Show Example <i className="fa-solid fa-lock text-sm"></i>
                  </button>
                </div>
                <div className="blur">
                  {visibleStates &&
                    visibleStates.map((state, index) => (
                      <ProgressBarComponent
                        key={index}
                        name={state.name}
                        progressValue={state.progressValue}
                        color="ri-orange"
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="md:w-9/12 mr-4 md:ml-4">
          <div className=" rounded-lg p-4 w-full md:h-[624px] xl:h-[616px] 2xl:h-[694px] bg-white overflow-hidden">
            <div className="flex w-full mb-1">
              <div className="w-6/12">
                <p className="text-gray-color font-medium text-sm md:text-base 2xl:text-lg">
                  Country
                </p>
              </div>

              <div className="w-6/12 flex justify-end">
                <div className="bg-[#EBEBEB]  p-1 rounded-md flex justify-center items-center">
                  <div className="flex w-full">
                    <div>
                      <input
                        type="radio"
                        name="mapOption"
                        id="world"
                        value="world"
                        className="peer hidden"
                        onChange={handleMapChange}
                        checked={selectedMap === "world"}
                      />
                      <label
                        htmlFor="world"
                        className="block cursor-pointer select-none rounded-md p-1 text-center px-3 peer-checked:bg-white peer-checked:text-black">
                        <p className="text-xs md:text-base">World</p>
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        name="mapOption"
                        id="india"
                        value="india"
                        className="peer hidden"
                        onChange={handleMapChange}
                        checked={selectedMap === "india"}
                      />
                      <label
                        htmlFor="india"
                        className="block cursor-pointer select-none rounded-md px-3 p-1 text-center peer-checked:bg-white peer-checked:text-black">
                        <p className="text-xs md:text-base">India</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {cardVisible.country ? (
              <div>
                <div>
                  <Chart
                    chartType="GeoChart"
                    width="100%"
                    height="60%"
                    data={concatenatedArray}
                    options={
                      selectedMap === "world"
                        ? optionsWorld
                        : selectedMap === "india"
                        ? optionsIN
                        : {}
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="relative w-full">
                <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                  <button
                    className="text-gray-700 text-sm bg-white px-4 py-2 rounded-full shadow-lg z-10"
                    onClick={() => handleShowCards("country")}>
                    Show Example <i className="fa-solid fa-lock text-sm"></i>
                  </button>
                </div>
                <div className="blur">
                  <div>
                    <Chart
                      chartType="GeoChart"
                      width="100%"
                      height="60%"
                      data={concatenatedArray}
                      options={
                        selectedMap === "world"
                          ? optionsWorld
                          : selectedMap === "india"
                          ? optionsIN
                          : {}
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audience;
