import React, { Component } from "react";

class SearchBar extends Component {
  productoRef = React.createRef();

  buscarProducto = e => {
    e.preventDefault();

    const producto = {
      nombre: this.productoRef.current.value
    };

    const patron = " ";
    const nuevoValor = "%20";
    const resultado = producto.nombre.replace(/\s/g, nuevoValor);

    console.log(resultado);
    this.props.nombreConsulta(producto);
  };

  render() {
    return (
      <div>
        <h2 className="text-center">Buscar productos</h2>
        <form className="py-3" onSubmit={this.buscarProducto}>
          <div className="form-group row ">
            <div className="col-md-10">
              <input
                type="text"
                className="form-control"
                id="busqueda"
                ref={this.productoRef}
                placeholder="Búsqueda"
              />
            </div>
            <div className="col-md-2 mt-4 mt-sm-0 text-md-center">
              <button className="btn btn-primary btn-block">Buscar</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
