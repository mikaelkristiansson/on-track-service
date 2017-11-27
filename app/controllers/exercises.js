import Exercise from '../models/exercise';
import moment from 'moment';

const create = (req, res, next) => { //POST
    if (!req.body.type || !req.body.user) res.json({success: false, message: 'Please pass exercise type and user.'});
    let newExercise = new Exercise(req.body);
    newExercise.save((err, exercise) => {
        if (err) throw err;
        if (!exercise) return next();
        res.status(200).send(exercise);
    });
};

const listMonth = (req, res) => { //GET
    let selectedMonth = req.query.date; //2017-11-01
    let endOfMonth = moment(selectedMonth).endOf('month');
    let user = req.user;
    if (!user) res.json({success: false, message: 'User need to be specified'});
    Exercise.find({created_at: {$gte: selectedMonth, $lt: endOfMonth}})
        .where('user').equals(user._id)
        .select('created_at type')
        .exec((err, result) => {
            if (err) throw err;
            res.status(200).send(result);
        });
};

const listYear = (req, res) => { //GET
    let selectedYear = req.query.date; //2017-01-01
    let endOfYear = moment(selectedYear).endOf('year');
    let user = req.user;
    if (!user) res.json({success: false, message: 'User need to be specified'});
    Exercise.find({created_at: {$gte: selectedYear, $lt: endOfYear}})
        .where('user').equals(user._id)
        .select('created_at type')
        .exec((err, result) => {
            if (err) throw err;
            res.status(200).send(result);
        });
};

const findByIdAndUpdate = (id, data, callback) => {
    Exercise.findByIdAndUpdate(id, data, {new: true}, callback);
};

//on update {upsert: true}


export {
    create,
    listMonth,
    listYear,
    findByIdAndUpdate
};
