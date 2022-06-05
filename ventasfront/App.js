import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const url = "http://localhost:8084/api/v1/venta/";


class App extends Component {

  state = {
    data: [],
    modalInsertar: false,
    form: {
      idVenta: '',
      folio: '',
      costoTotal: '',
      cantidadPagada: '',
      cambio: '',
      observaciones: '',
      fecha: '',
      estado: '',
      status_delete: '',
      idCliente: '',
      idFactura: ''
    }
  }

  handleChange = async e => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  }

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }

  //peticion Get
  peticionGet = () => {
    axios.get(url).then(
      response => {
        this.setState({ data: response.data.data });
      }).catch(error => {
        console.log(error.message);
      })
  }

  //peticion Post
  peticionPost = async () => {
    delete this.state.form.id;
    await axios.post(url, this.state.form).then(response => {
      this.modalInsertar();
      this.peticionGet();
    }).catch(error => {
      console.log(error.message);
    })
  }
  //Peticion Put
  peticionPut = () => {
    axios.put(url + this.state.form.id, this.state.form).then(response => {
      this.modalInsertar();
      this.peticionGet();
    })
  }

  seleccionarUsuario = (venta) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        idVenta: venta.idVenta,
        folio: venta.folio,
        costoTotal: venta.costoTotal,
        cantidadPagada: venta.cantidadPagada,
        cambio: venta.cambio,
        observaciones: venta.observaciones,
        fecha: venta.fecha,
        estado: venta.estado,
        status_delete: venta.status_delete,
        idCliente: venta.idCliente,
        idFactura: venta.idFactura
      }
    })
  }

  removeUsuario = (id) => {
    fetch("http://localhost:8084/api/v1/venta/" + id, {
      method: 'DELETE'
    })
      .then(res => res.json())

  }

  metodoDelete = (id) => {
    var resultado = window.confirm('¿Estás seguro de eliminar la venta?');
    if (resultado === true) {
      this.removeUsuario(id);
      window.alert('Venta eliminada correctamente');
      this.peticionGet();
    } else {
      return 0;
    }
  }

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    const { form } = this.state;
    return (
      <div className="App">
        <br />
        <center>
          <button className='btn btn-primary' onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Registrar nueva venta </button>
        </center>
        <br /><br />
        <table className=" table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Folio</th>
              <th>Cliente</th>
              <th>costoTotal</th>
              <th>cantidadPagada</th>
              <th>cambio</th>
              <th>observaciones</th>
              <th>fecha</th>
              <th>estado</th>
              <th>Factura</th>
              <th>status</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(venta => {
              return (
                <tr className="bg-primary">
                  <td>{venta.id}</td>
                  <td>{venta.folio}</td>
                  <td>{venta.idCliente}</td>
                  <td>{venta.costoTotal}</td>
                  <td>{venta.cantidadPagada}</td>
                  <td>{venta.cambio}</td>
                  <td>{venta.observaciones}</td>
                  <td>{venta.fecha}</td>
                  <td>{venta.estado}</td>
                  <td>{venta.idFactura}</td>
                  <td>{venta.status_delete}</td>
                  <td>
                    <button type="button" className="btn btn-success" onClick={() => { this.seleccionarUsuario(venta); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
                    &nbsp;&nbsp;&nbsp;
                    <button type="button" className="btn btn-danger" onClick={() => this.metodoDelete(venta.id)} ><FontAwesomeIcon icon={faTrashAlt} /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {
        }
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            Registro/Actualización de Usuario
          </ModalHeader>
          //formulario de Registro
          <ModalBody>
            <div className="form-group">
              <input className="form-control" placeholder='Folio' type="text" name="folio" id="folio" onChange={this.handleChange} value={form ? form.folio : ''} />
              <br />
              <input className="form-control" placeholder='ID cliente' type="text" name="cliente" id="cliente" onChange={this.handleChange} value={form ? form.idCliente : ''} />
              <br />
              <input className="form-control" placeholder='Costo Total' type="text" name="costo" id="costo" onChange={this.handleChange} value={form ? form.costoTotal : ''} />
              <br />
              <input className="form-control" placeholder='Cantidad Pagada' type="text" name="cantidad" id="cantidad" onChange={this.handleChange} value={form ? form.cantidadPagada : ''} />
              <br />
              <input className="form-control" placeholder='Cambio' type="text" name="cambio" id="cambio" onChange={this.handleChange} value={form ? form.cambio : ''} />
              <br />
              <input className="form-control" placeholder='observaciones' type="text" name="observaciones" id="observaciones" onChange={this.handleChange} value={form ? form.observaciones : ''} />
              <br />
              <input className="form-control" placeholder='fecha' type="date" name="fecha" id="fecha" onChange={this.handleChange} value={form ? form.fecha : ''} />
              <br />
              <input className="form-control" placeholder='estado' type="text" name="estado" id="estado" onChange={this.handleChange} value={form ? form.estado : ''} />
              <br />
              <input className="form-control" placeholder='ID factura' type="text" name="factura" id="factura" onChange={this.handleChange} value={form ? form.idFactura : ''} />
              <br />
              <input className="form-control" placeholder='Status' type="text" name="status" id="status" onChange={this.handleChange} value={form ? form.status_delete : ''} />
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.tipoModal == 'insertar' ?
              <button className="btn btn-success" onClick={() => this.peticionPost()}>
                Insertar
              </button> : <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                Actualizar
              </button>
            }                   &nbsp;&nbsp;&nbsp;
            <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>
      </div >
    );
  }
}

export default App;
