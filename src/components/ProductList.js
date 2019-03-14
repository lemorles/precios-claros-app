import React, { Component } from "react";
import SearchBar from "./SearchBar";
import Product from "./Product";
import axios from "axios";

class ProductList extends Component {
  state = {
    nombreConsulta: "",
    products: [],
    total: ""
  };

  nombreConsulta = respuesta => {
    const { nombre } = respuesta;

    this.setState({
      nombreConsulta: nombre
    });

    this.consumeAPI(nombre);
  };

  consumeAPI = nombre => {
    const sucursal = "64-1-14"; //sucursal Mendoza
    const api = `https://d3e6htiiul5ek9.cloudfront.net/prod/productos?string=${nombre}&limit=100&id_sucursal=${sucursal}&entorno=mayoristas`;

    axios
      .get(api, {
        headers: { "x-api-key": process.env.API_KEY }
      })

      .then(res => {
        const products = res.data.productos;
        const total = res.data.total;

        this.setState({ products, total });
      });
  };

  renderProducts() {
    try {
      return (
        <div className="row justify-content-center">
          {Object.keys(this.state.products).map(key => (
            <Product key={key} product={this.state.products[key]} />
          ))}
        </div>
      );
    } catch {
      return (
        <div className="text-center lead">
          Error interno de Servidor. Intente nuevamente.
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <SearchBar nombreConsulta={this.nombreConsulta} />
        {this.state.total !== 0 ? null : (
          <div className="lead text-center mt-2">
            No se encontraron resultados para tu búsqueda.
          </div>
        )}
        {this.renderProducts()}
      </div>
    );
  }
}

export default ProductList;
