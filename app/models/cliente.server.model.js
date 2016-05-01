var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClienteSchema = new Schema({
  documento: {
    type: Number,  
	default: 0, 
  },
  nombres: {
    type: String,
    default: '',
    trim: true
  },
  detalles: {
    type: String,
    default: '',
    trim: true
  }
});

mongoose.model('Cliente', ClienteSchema);