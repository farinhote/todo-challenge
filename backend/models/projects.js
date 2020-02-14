//Define a schema
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    creation_date: {
        type: Date,
        trim: true,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    debugger;
    this.creation_date = new Date().toLocaleDateString("pt");
    next();
});

module.exports = mongoose.model('Project', ProjectSchema)