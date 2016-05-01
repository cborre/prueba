var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductoSchema = new Schema({  
  producto: {
    type: String,
    default: '',
    trim: true,
    required: 'El producto no puede estar en blanco'
  },
  precio: {
    type: Number,  
	default: 0, 
  },
  descripcion: {
    type: String,
    default: '',
    trim: true
  }
});

mongoose.model('Producto', ProductoSchema);