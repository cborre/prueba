var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CompraSchema = new Schema({
  id_cliente: {
    type: Schema.Types.ObjectId,
    ref: 'Cliente',
	required: 'El cliente no puede estar en blanco'
  }, 
  id_producto: {
	type: Schema.Types.ObjectId,
    ref: 'Producto',
	required: 'El cliente no puede estar en blanco'
  },
  id_sede: {
    type: Schema.Types.ObjectId,
    ref: 'Sede'
  },
  precio: {
    type: Number,  
	default: 0, 
  },
  descripcion: {
    type: String,
    default: '',
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  } 
});

mongoose.model('Compra', CompraSchema);