import React, { Component } from "react";

class SearchBar extends Component {
  state = {
    error: false
  };

  productoRef = React.createRef();

  buscarProducto = e => {
    e.preventDefault();

    const producto = {
      nombre: this.productoRef.current.value
    };

    if (producto.nombre == "") {
      this.setState({
        error: true
      });
    } else {
      this.props.nombreConsulta(producto);

      e.currentTarget.reset();

      this.setState({
        error: false
      });
    }
  };

  render() {
    const existeError = this.state.error;
    return (
      <div>
        <h2 className="text-center">Buscar productos</h2>
        <form className="py-3" onSubmit={this.buscarProducto}>
          <div className="form-group row">
            <div className="col-md-10">
              <input
                type="text"
                className="form-control"
                id="busqueda"
                ref={this.productoRef}
                placeholder="Búsqueda"
              />
            </div>
            <div className="col-md-2 mt-4 mt-md-0 text-md-center">
              <button className="btn btn-primary btn-block">Buscar</button>
            </div>
          </div>
        </form>
        {existeError ? (
          <div className="alert alert-danger text-center">
            El campo búsqueda es obligatorio.
          </div>
        ) : null}
      </div>
    );
  }
}

export default SearchBar;
