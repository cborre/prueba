var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SedeSchema = new Schema({  
  sede: {
    type: String,
    default: '',
    trim: true,
    required: 'La sede no puede estar en blanco'
  },
  direccion: {
    type: String,
    default: '',
    trim: true
  }
});

mongoose.model('Sede', SedeSchema);