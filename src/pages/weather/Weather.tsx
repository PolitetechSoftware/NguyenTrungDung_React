import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { SelectComponent } from "../../components/Select";
import { SliderComponent } from "../../components/Slider";
import { initWeather } from "./constant";
import { IWeather } from "./interface";
import "./index.css";

export const WeatherPage = () => {
  const [arrayWeather] = useState<Array<IWeather>>(initWeather);
  const [arrayFilter,setArrayFilter] =  useState<Array<IWeather>>(initWeather)
  const handleSelectItem = (event: ChangeEvent<HTMLSelectElement>) => {
    const objectResult: IWeather = {
      cityNanme: "",
      wind: "",
      temperature: 0,
      time: "",
    };
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${event.target.value}&appid=9f112416334ce37769e5c8683b218a0d`
    )
      .then((response) => response.json())
      .then((data) => {
        objectResult.cityNanme = data.name;
        objectResult.wind = data.wind.speed;
        objectResult.temperature = parseInt(data.main.temp, 10) - 273;
        fetch(
          `https://api.openweathermap.org/data/2.5/uvi?appid=9f112416334ce37769e5c8683b218a0d&lat=${data.coord.lat}&lon=${data.coord.lon}`
        )
          .then((response) => response.json())
          .then((data) => {
            const dateIso = data.date_iso;
            const hour =
              new Date(dateIso).getHours() < 10
                ? `0${new Date(dateIso).getHours()}`
                : new Date(dateIso).getHours();
            const minute =
              new Date(dateIso).getMinutes() < 10
                ? `0${new Date(dateIso).getMinutes()}`
                : new Date(dateIso).getMinutes();
            const second =
              new Date(dateIso).getSeconds() < 10
                ? `0${new Date(dateIso).getSeconds()}`
                : new Date(dateIso).getSeconds();
            const getTiME = `${hour}:${minute}:${second}`;
            const formatTime = (timeString: string) => {
              const [hourString, minute] = timeString.split(":");
              const hour = +hourString % 24;
              return (
                (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM")
              );
            };
            objectResult.time = formatTime(getTiME);
            setArrayFilter([objectResult]);
          });
      });
  };

  const handleChangeItemSlider: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const resultArray = arrayWeather.filter(
      (itemFilter: { temperature: number }) =>
        itemFilter.temperature === parseInt(event.target.value,10)
    )
    setArrayFilter(resultArray)
  };

  const handleDeleteItem = (item: { cityNanme: string }) => {
    const resultArray = arrayFilter.filter(
      (itemFilter: { cityNanme: string }) =>
        itemFilter.cityNanme !== item.cityNanme
    );
    if (window.confirm("Do you want to delete this item?")) {
      setArrayFilter(resultArray);
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="padding-weather">
        <SelectComponent handleSelectItem={handleSelectItem} />
      </div>
      <div className="padding-weather">
        <SliderComponent handleChangeItemSlider={handleChangeItemSlider} />
      </div>
      {arrayFilter.length > 0 &&
        arrayFilter.map((item: any) => (
          <div className="main-info" key={item.temperature}>
            <span className="text-info">
              {item.cityNanme}, {item.temperature}°C
            </span>
            <div className="info-right">
              PM {item.time}
              <div>Wind Speed: {item.wind} MPH</div>
            </div>
            <div
              className="close-icon"
              onClick={() => handleDeleteItem(item)}
            ></div>
          
          </div>
        ))}
    </>
  );
};
