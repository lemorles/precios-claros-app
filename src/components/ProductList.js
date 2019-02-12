import React, { Component } from "react";
import SearchBar from "./SearchBar";
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

    axios.get(api).then(res => {
      const products = res.data.productos;
      const total = res.data.total;

      this.setState({ products, total });
    });
  };

  renderTable() {
    return (
      <div>
        <SearchBar nombreConsulta={this.nombreConsulta} />
        {this.state.total !== 0 ? null : (
          <div className="lead text-center mt-2">
            No se encontraron resultados para tu búsqueda.
          </div>
        )}
        {this.state.products != 0 ? (
          <div>
            <div className="row justify-content-between">
              <h4 className="pb-2">Lista de productos.</h4>
              <h3 className="lead float">
                Cantidad de resultados: {this.state.total}
              </h3>
              <div className="table-responsive" />

              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Costo</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>{this.renderProducts()}</tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  renderProducts() {
    return this.state.products.map(producto => (
      <tr key={producto.id}>
        <td>{producto.id}</td>
        <td>{producto.nombre}</td>
        <td>{producto.marca}</td>
        <td>${producto.precio_unitario_bulto_max_con_iva}</td>
        <td>{`$${(producto.precio_unitario_bulto_max_con_iva * 1.7).toFixed(
          2
        )}`}</td>
      </tr>
    ));
  }

  render() {
    return <div>{this.renderTable()}</div>;
  }
}

export default ProductList;
