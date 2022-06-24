const mongoose = require('mongoose');
const carSchema = new mongoose.Schema(
	{
		make: {
			type: String,
			required: true,
		},
		model: {
			type: String,
			required: true,
		},
		release_date: {
			type: Number,
			min: 1900,
			required: true,
		},
		transmission_type: {
			type: String,
			enum: ['MANUAL', 'AUTOMATIC', 'AUTOMATED_MANUAL', 'DIRECT_DRIVE', 'UNKNOWN'],
			required: true,
		},
		size: {
			type: String,
			enum: ['Compact', 'Midsize', 'Large'],
			required: true,
		},
		style: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		// Step 1 : Implement soft delete by toggling this boolean
		isDeleted: { type: Boolean, default: false, required: true },
	},
	{
		timestamps: true,
	}
);

// Step 2 : Implement soft delete by using mongoose middleware
// more on that here https://mongoosejs.com/docs/middleware.html
// basically, we jump in before any mongoose.find.. methods
// and remove result that is isDeleted : true 
// the original data stay the same while the query result is only isDeleted:false exclusively

carSchema.pre(/^find/, function (next) {
	if (!('_conditions' in this)) return next();
	if (!('isDeleted' in carSchema.paths)) {
		delete this['_conditions']['all'];
		return next();
	}
	if (!('all' in this['_conditions'])) {
		//@ts-ignore
		this['_conditions'].isDeleted = false;
	} else {
		delete this['_conditions']['all'];
	}
	next();
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
