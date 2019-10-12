import Axios from "axios";

export const getInfoTodayIncome = async () => {
  const result = await Axios.get(
    `${process.env.REACT_APP_SERVER_API}reports?field=1`
  );
  return {
    results: result.data.resultQuery
  };
}

export const getInfoWeeksOrders = async () => {
    const result = await Axios.get(
      `${process.env.REACT_APP_SERVER_API}reports?field=2`
    );
    return {
      results: result.data.resultQuery
    };
  };

  export const getInfoYearIncome = async () => {
    const result = await Axios.get(
      `${process.env.REACT_APP_SERVER_API}reports?field=3`
    );
    return {
      results: result.data.resultQuery
    };
  }

  export const getRecentOrder = async () => {
    const result = await Axios.get(
      `${process.env.REACT_APP_SERVER_API}reports/recent`
    );
    return {
      results: result.data.resultQuery
    };
  }
