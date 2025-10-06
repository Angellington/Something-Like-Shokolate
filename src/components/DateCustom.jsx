import { useState, useEffect } from "react";
import '../styles/components/DateCustom.css'

const DateCustom = () => {
  const [date, setDate] = useState(new Date());
  const [mes, setMes] = useState(date.getMonth() + 1);
  const [dia, setDia] = useState(date.getDate());
  // const [dia, setDia] = useState(12)
  // const [mes, setMes] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const horario = date.toLocaleTimeString("en", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Formato 24h
  });

  // Traz os dias das semana
  const weekday = (date) => {
    const dias = [
      "SunDaY",
      "MonDaY",
      "TuesDaY",
      "WeDnesday",
      "ThursDaY",
      "FriDaY",
      "SaturDaY",
    ];
    return dias[date.getDay()];
  };
  // console.log(weekday(date))

  const hora_status = (date) => {
    const day_status = ["Morning", "Afternoon", "Evening", "Night"];
    let hora = date.getHours();
    let hora_status = "";

    switch (true) {
      case hora >= 0 && hora < 6:
        hora_status = day_status[3]; // Night
        break;
      case hora >= 6 && hora < 12:
        hora_status = day_status[0]; // Morning
        break;
      case hora >= 12 && hora < 18:
        hora_status = day_status[1]; // Afternoon
        break;
      case hora >= 18 && hora < 24:
        hora_status = day_status[2]; // Evening
        break;
      default:
        hora_status = "Unknown";
        break;
    }
    return hora_status;
  };

  // console.log(weekday(date), 'weekday')
  // let dia = date.getDay() + 1;

  return (
    <div className="DateTime">
      <div className="MonthContainer">
        <p className={getMesId(mes)}>{mes}</p>
        <p className={`${getMesId(mes)}-stroke`}>{mes}</p>
      </div>
      <div className="BarContainer">
        <div className="bar"></div>
        <div className="bar-2"></div>
        <div className="bar-3"></div>
        <div className="bar-stroke"></div>
        <div className="bar-2-stroke"></div>
      </div>
      <div className="bar"></div>
      <div className="DayContainer">
        <p className="p-dia">{dia}</p>
        <p className="p-dia-stroke">{dia}</p>
      </div>
      <div className="WeekdayContainer">
        <p className="weekday">{weekday(date)}</p>
        <p className="weekday-stroke">{weekday(date)}</p>
        <p className="weekday-stroke-2">{weekday(date)}</p>
        <p className="weekday-stroke-3">{weekday(date)}</p>
        <p className="weekday-stroke-4">{weekday(date)}</p>
      </div>
      <div className="Hour-Container">
        <p className="Hour">{hora_status(date)}</p>
        <p className="Hour-stroke">{hora_status(date)}</p>
      </div>
      <div className="TimeNow-Container">
        <p className="p-TimeNow">{horario}</p>
        <p className="p-TimeNow-stroke">{horario}</p>
      </div>
      <div className="Season-Container">
        {getSeason(date) === "Summer" ? (
          <img className="Season-Emoti" src="/emoti/spring-sun.png"></img>
        ) : null}
        {getSeason(date) === "Winter" ? (
          <img className="Season-Emoti" src="/emoti/floco-de-neve.png"></img>
        ) : null}
        {getSeason(date) === "Fall" ? (
          <img className="Season-Emoti" src="/emoti/folha-de-outono.png"></img>
        ) : null}
        {getSeason(date) === "Spring" ? (
          <img className="Season-Emoti" src="/emoti/spring-sun.png"></img>
        ) : null}
      </div>

      {/* <p id='date'>{dia}/{mes}</p>
      <p>{weekday}</p>
      <p>{hora_status}</p>
      <p>{horario} - {hora_status(date)}</p> */}
    </div>
  );
};

const getMesId = (mes) => {
  switch (mes) {
    case 2:
      return "p-mes-except";
    case 7:
      return "p-mes-except";
    case 8:
      return "p-mes-except";
    case 9:
      return "p-mes-except";
    case 10:
      return "p-mes-except-decimal";
    case 11:
      return "p-mes-except-decimal";
    case 12:
      return "p-mes-except-decimal";
    default:
      return "p-mes";
  }
};

function getSeason(date) {
  const dia = date.getDate();
  const mes = date.getMonth(); // Janeiro = 0, Dezembro = 11

  if (
    (mes === 11 && dia >= 21) ||
    mes === 0 ||
    mes === 1 ||
    (mes === 2 && dia < 20)
  ) {
    return "Summer"; // 21 de Dezembro a 19 de Março
  }

  if (
    (mes === 2 && dia >= 20) ||
    mes === 3 ||
    mes === 4 ||
    (mes === 5 && dia < 20)
  ) {
    return "Fall"; // 20 de Março a 19 de Junho
  }

  if (
    (mes === 5 && dia >= 20) ||
    mes === 6 ||
    mes === 7 ||
    (mes === 8 && dia < 22)
  ) {
    return "Winter"; // 20 de Junho a 21 de Setembro
  }

  return "Spring"; // 22 de Setembro a 20 de Dezembro
}

export default DateCustom;
