/*!

=========================================================
* Black Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
//import classNames from "classnames";
// react plugin used to create charts
import { Line  } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Input,
  FormGroup,
  Label,
  CustomInput
} from "reactstrap";

import { connect } from 'react-redux';
import { Field, reduxForm, /*FieldArray*/ } from 'redux-form';
import ReactDatetime from "react-datetime";

import * as actions from '../action/sale';
import * as selectors from '../reducer';
import { FadeLoader } from "react-spinners";
import { css } from "@emotion/react";
import "react-datetime/css/react-datetime.css";

const override = css`
  display: block;
  margin: 30px -40px auto;
  border-color: red;
`;

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: true
    }
  }

  componentDidMount() {
    const {
      fetchSale,
    } = this.props;
    let current_datetime = new Date();
    //console.log(current_datetime.getFullYear(),current_datetime.getMonth() + 1)
    fetchSale({
      product: '',
      client: '',
      year: current_datetime.getFullYear(),
      month: current_datetime.getMonth() + 1,
    });
  }

  FormInput = ({
    input,
    placeholder,
    type,
    value,
    icon,
    meta: { error },
  }) => (
    <>
      <Input {...input} placeholder={placeholder} type={type} />
      <label className="error">{error}</label>
    </>
  )

  FormDate = ({
    input: {
      onChange,
      value
    },
    placeholder,
    dateFormat,
    meta: {
      touched,
      error
    }
  }) => (
    <>
      <ReactDatetime
        inputProps={{
          className: "form-control",
          placeholder,
        }}
        timeFormat={false}
        dateFormat={dateFormat}
        value={value}
        onChange={value => onChange(value._d)}
        formNoValidate
      />
      {(touched && error) && <label className="error">
        {error}
      </label>}
    </>
  )

  render() {
    const {
      sales,
      loading,
      fetchSale,
      handleSubmit,
      forecast,
      forecast_loading,
    } = this.props;

    const forecastData = {
      data: (canvas) => {
        let ctx = canvas.getContext("2d");
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)");
        return {
          labels: ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'],
          datasets: [
            {
              label: "Ventas",
              fill: true,
              backgroundColor: gradientStroke,
              hoverBackgroundColor: gradientStroke,
              borderColor: "#d048b6",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: forecast ? forecast.map(day => (
                this.state.type === true ?
                parseFloat(day.venta_neta.toFixed(2)) : 
                parseFloat(day.cantidad_unidad.toFixed(2))
              )): [],
            },
          ],
        };
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(225,78,202,0.1)",
                zeroLineColor: "transparent",
              },
              ticks: {
                suggestedMin: 60,
                suggestedMax: 120,
                padding: 20,
                fontColor: "#9e9e9e",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(225,78,202,0.1)",
                zeroLineColor: "transparent",
              },
              ticks: {
                padding: 20,
                fontColor: "#9e9e9e",
              },
            },
          ],
        },
      },
    };

    const data = {
      data: (canvas) => {
        let ctx = canvas.getContext("2d");
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)");
        return {
          labels: sales.map((sale) => (
            sale.fecha_documento
          )),
          datasets: [
            {
              label: "Ventas",
              fill: true,
              backgroundColor: gradientStroke,
              hoverBackgroundColor: gradientStroke,
              borderColor: "#d048b6",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: sales.map((sale) => (
                this.state.type === true ?
                  sale.venta_neta
                  :
                  sale.cantidad_unidad
              )),
            },
          ],
        };
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(225,78,202,0.1)",
                zeroLineColor: "transparent",
              },
              ticks: {
                suggestedMin: 60,
                suggestedMax: 120,
                padding: 20,
                fontColor: "#9e9e9e",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(225,78,202,0.1)",
                zeroLineColor: "transparent",
              },
              ticks: {
                padding: 20,
                fontColor: "#9e9e9e",
              },
            },
          ],
        },
      },
    }

    return (
      <>
        <div className="content">
          <Row>
            <Col lg="12">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Ventas</h5>
                  <CardTitle tag="h3">
                    <form
                      onSubmit={handleSubmit(fetchSale.bind(this))}
                    >
                      <Row>
                        <Col md="2">
                          <FormGroup className={`has-label}`}>
                            <Label>Cliente</Label>
                            <Field
                              name="client"
                              component={this.FormInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="2">
                          <FormGroup className={`has-label}`}>
                            <Label>Producto</Label>
                            <Field
                              name="product"
                              component={this.FormInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <p className="category">Ventas/Unidades</p>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">Ventas</span>
                            <CustomInput
                              type="switch"
                              id="switch-5"
                              className="mt-n4"
                              onClick={() => { this.setState({ type: !this.state.type }) }}
                            />
                            <span className="ml-n2">Unidades</span>
                          </div>
                          <br />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="2">
                          <FormGroup className={`has-label}`}>
                            <Label>Fecha</Label>
                            <Field
                              name="date"
                              component={this.FormDate}
                              type="text"
                              placeholder="Selecciona mes/año"
                              dateFormat='MM/yyyy'
                            />
                          </FormGroup>
                        </Col>
                        <Col md="2">
                          <FormGroup className={`has-label}`}>
                            <Label>Week Number</Label>
                            <Field
                              name="week"
                              component={this.FormInput}
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                        <Col md={{ size: '2' }} style={{ marginTop: 38 }}>
                          <Button color="info"
                            type="submit"
                          >
                            Busqueda
                          </Button>
                        </Col>
                      </Row>
                    </form>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    {loading === false ?
                      <>
                        <Line
                          data={data.data}
                          options={data.options}
                        />
                      </>
                      :
                      <Col sm="12" md={{ size: 2, offset: 6 }}>
                        <FadeLoader 
                          css={override} 
                          size={10} 
                          color={"#1d8cf8"} 
                          margin={8} 
                        />
                      </Col>
                    }
                  </div>
                  <h2>Prediccion ventas proxima semana</h2>
                  <div className="chart-area">
                    {forecast_loading === false && forecast ?
                      <>
                        <Line
                          data={forecastData.data}
                          options={forecastData.options}
                        />
                      </>
                      :
                      <Col sm="12" md={{ size: 2, offset: 6 }}>
                        <FadeLoader 
                          css={override} 
                          size={10} 
                          color={"#1d8cf8"} 
                          margin={8} 
                        />
                      </Col>
                    }
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
};

const ViewDash = reduxForm({
  form: 'sale',
})(Dashboard);

export default connect(
  (state) => ({
    sales: selectors.getAllSale(state),
    loading: selectors.getLoading(state),
    forecast: selectors.getForecastData(state),
    forecast_loading: selectors.getForecastLoading(state),
  }),
  (dispatch) => ({
    fetchSale(values) {
      let current_datetime = new Date(values.date? values.date : new Date())
      var month = current_datetime.getMonth() + 1;
      var year = current_datetime.getFullYear();
      console.log(values)
      dispatch(actions.fetchSale({
        product: values.product? values.product : '',
        client: values.client? values.client : '',
        //date: current_datetime.toLocaleDateString('en-CA'),
        month,
        year,
      }));
      dispatch(actions.fetchSaleForecast({
        product: values.product ? values.product : '',
        client: values.client ? values.client : '',
        month,
        year,
        week: values.week ? values.week : '',
      }));
    },
    fetchSaleForecast(values){
      dispatch(actions.fetchSaleForecast({
        product: values.product ? values.product : '',
        client: values.client ? values.client : '',
      }));
    }
  })
)(ViewDash);
