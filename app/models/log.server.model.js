var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LogSchema = new Schema({
  fecha: {
    type: Date,
    default: Date.now
  },
  descripcion: {
    type: String,
    default: '',
    trim: true
  }  
});

mongoose.model('Log', LogSchema);